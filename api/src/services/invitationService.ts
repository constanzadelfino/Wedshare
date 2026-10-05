import { randomBytes } from 'node:crypto';

import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { getStorageClient, publicPhotoUrl } from '../lib/storage';
import { InvitationData, isRsvpClosed, RsvpInput } from '../models/invitation';
import { toGiftData } from './giftService';

// Consultas de la web del invitado. No hay sesión: el grupo se busca por su invite_token,
// y desde ahí solo se llega a su propio evento y su propia respuesta.

function fromDbDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Error con el mensaje y el código que se le devuelven al invitado.
export class RsvpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const eventInclude = {
  items: { orderBy: [{ date: 'asc' }, { time: 'asc' }] },
  gifts: { orderBy: { createdAt: 'asc' } },
} satisfies Prisma.EventInclude;

const invitationInclude = {
  guests: { orderBy: { createdAt: 'asc' } },
  rsvp: true,
  event: { include: eventInclude },
} satisfies Prisma.GuestGroupInclude;

type EventWithDetails = Prisma.EventGetPayload<{ include: typeof eventInclude }>;

// La parte de la invitación que es igual para todos los grupos del evento.
function toInvitationEvent(event: EventWithDetails): InvitationData['event'] {
  const storage = getStorageClient();
  const rsvpDeadline = event.rsvpDeadline ? fromDbDate(event.rsvpDeadline) : null;
  const hasBank = !!(event.giftBank || event.giftHolder || event.giftAlias || event.giftCbu);
  const showGifts =
    event.giftsEnabled && (hasBank || event.giftMailbox || event.gifts.length > 0);
  return {
    name: event.name,
    coupleNames: event.coupleNames,
    date: fromDbDate(event.date),
    venue: event.venue,
    welcomeMessage: event.welcomeMessage,
    coverPhotoUrls: storage ? event.coverPhotos.map((path) => publicPhotoUrl(storage, path)) : [],
    coverWithoutPhotos: event.coverWithoutPhotos,
    rsvpDeadline,
    rsvpClosed: isRsvpClosed(rsvpDeadline),
    dressCode: event.dressCode,
    spotifyPlaylistUrl: event.playlistEnabled ? event.spotifyPlaylistUrl : null,
    story:
      event.storyText || event.storyPhoto
        ? {
            title: event.storyTitle,
            text: event.storyText,
            photoUrl: storage && event.storyPhoto ? publicPhotoUrl(storage, event.storyPhoto) : null,
          }
        : null,
    albumPhotoUrls: storage ? event.albumPhotos.map((path) => publicPhotoUrl(storage, path)) : [],
    closingPhrase: event.closingPhrase,
    backgroundMusic: event.backgroundMusic,
    items: event.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      date: fromDbDate(item.date),
      time: item.time,
      venueName: item.venueName,
      address: item.address,
      placeId: item.placeId,
      latitude: item.latitude,
      longitude: item.longitude,
    })),
    gifts: showGifts
      ? {
          bank: hasBank
            ? { bank: event.giftBank, holder: event.giftHolder, alias: event.giftAlias, cbu: event.giftCbu }
            : null,
          mailbox: event.giftMailbox,
          // Sin el id: el invitado no lo necesita.
          ideas: event.gifts.map((gift) => {
            const { id: _id, ...data } = toGiftData(gift);
            return data;
          }),
        }
      : null,
  };
}

// Devuelve null si no hay ningún grupo con ese token.
export async function getInvitation(inviteToken: string): Promise<InvitationData | null> {
  const group = await prisma.guestGroup.findUnique({
    where: { inviteToken },
    include: invitationInclude,
  });
  if (!group) {
    return null;
  }

  const anyoneConfirmed = group.guests.some((guest) => guest.status === 'confirmed');
  return {
    preview: false,
    group: {
      name: group.name,
      guests: group.guests.map((guest) => ({
        id: guest.id,
        name: guest.name,
        status: guest.status,
        dietary: guest.dietary,
      })),
      rsvp: group.rsvp ? { message: group.rsvp.message } : null,
      // Si nadie asiste, el QR queda desactivado aunque el código siga guardado.
      entryCode: anyoneConfirmed ? group.entryCode : null,
    },
    event: toInvitationEvent(group.event),
  };
}

// Familia de ejemplo de la vista previa. Los ids son fijos y no existen en la base.
const PREVIEW_GROUP: InvitationData['group'] = {
  name: 'Familia Ejemplo',
  guests: [
    { id: '00000000-0000-4000-8000-000000000001', name: 'Persona de ejemplo 1', status: 'pending', dietary: null },
    { id: '00000000-0000-4000-8000-000000000002', name: 'Persona de ejemplo 2', status: 'pending', dietary: null },
  ],
  rsvp: null,
  entryCode: null,
};

// Vista previa para los novios: su invitación con una familia de ejemplo.
// Devuelve null si no hay ningún evento con ese token.
export async function getPreview(previewToken: string): Promise<InvitationData | null> {
  const event = await prisma.event.findUnique({ where: { previewToken }, include: eventInclude });
  if (!event) {
    return null;
  }
  return { preview: true, group: PREVIEW_GROUP, event: toInvitationEvent(event) };
}

// Guarda la respuesta del grupo. "create" es la primera confirmación y "update" el cambio
// de respuesta. Devuelve la invitación actualizada.
export async function saveRsvp(inviteToken: string, input: RsvpInput, mode: 'create' | 'update') {
  const group = await prisma.guestGroup.findUnique({
    where: { inviteToken },
    include: { guests: { select: { id: true } }, rsvp: true, event: { select: { rsvpDeadline: true } } },
  });
  if (!group) {
    throw new RsvpError('No encontramos esta invitación. Revisá el link que te mandaron.', 404);
  }

  const deadline = group.event.rsvpDeadline ? fromDbDate(group.event.rsvpDeadline) : null;
  if (isRsvpClosed(deadline)) {
    throw new RsvpError('La confirmación ya cerró. Si necesitás cambiar algo, escribiles a los novios.', 403);
  }
  if (mode === 'create' && group.rsvp) {
    throw new RsvpError('Tu grupo ya respondió. Podés cambiar la respuesta.', 409);
  }
  if (mode === 'update' && !group.rsvp) {
    throw new RsvpError('Todavía no respondiste la invitación.', 404);
  }

  // Tienen que venir todas las personas del grupo, sin repetir y sin ninguna ajena.
  const groupIds = new Set(group.guests.map((guest) => guest.id));
  const sentIds = new Set(input.guests.map((guest) => guest.id));
  if (
    sentIds.size !== input.guests.length ||
    sentIds.size !== groupIds.size ||
    [...sentIds].some((id) => !groupIds.has(id))
  ) {
    throw new RsvpError('La lista de personas cambió. Recargá la página e intentá de nuevo.', 409);
  }

  const anyoneAttending = input.guests.some((guest) => guest.attending === true);
  await prisma.$transaction(async (tx) => {
    for (const guest of input.guests) {
      await tx.guest.update({
        where: { id: guest.id },
        // Quien todavía no sabe queda pendiente: puede responder más adelante.
        data: {
          status: guest.attending === null ? 'pending' : guest.attending ? 'confirmed' : 'declined',
          dietary: guest.dietary,
        },
      });
    }
    await tx.rsvp.upsert({
      where: { groupId: group.id },
      create: { groupId: group.id, message: input.message },
      update: { message: input.message },
    });
    // El código del QR se crea la primera vez que alguien confirma y después no cambia,
    // así un pase guardado sigue sirviendo.
    if (anyoneAttending && !group.entryCode) {
      await tx.guestGroup.update({
        where: { id: group.id },
        data: { entryCode: randomBytes(16).toString('base64url') },
      });
    }
  });

  return (await getInvitation(inviteToken))!;
}
