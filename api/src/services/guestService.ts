import { randomBytes } from 'node:crypto';

import { Guest, GuestGroup } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { GuestGroupData, GuestGroupInput } from '../models/guest';

// Los grupos se buscan siempre a través del evento del usuario:
// cada pareja solo ve y toca a sus invitados.

function toGuestGroupData(group: GuestGroup & { guests: Guest[] }): GuestGroupData {
  return {
    id: group.id,
    name: group.name,
    phone: group.phone,
    inviteToken: group.inviteToken,
    guests: group.guests.map((guest) => ({ id: guest.id, name: guest.name, status: guest.status })),
  };
}

// Token largo y al azar para el link de la invitación (22 caracteres que se pueden usar en una URL).
function newInviteToken() {
  return randomBytes(16).toString('base64url');
}

const withGuests = { guests: { orderBy: { createdAt: 'asc' } } } as const;

// Devuelve el id del evento del usuario, o null si todavía no lo creó.
export async function getOwnerEventId(ownerId: string) {
  const event = await prisma.event.findUnique({ where: { ownerId }, select: { id: true } });
  return event?.id ?? null;
}

export async function listGuestGroups(eventId: string) {
  const groups = await prisma.guestGroup.findMany({
    where: { eventId },
    include: withGuests,
    orderBy: { createdAt: 'asc' },
  });
  return groups.map(toGuestGroupData);
}

export async function createGuestGroup(eventId: string, input: GuestGroupInput) {
  const group = await prisma.guestGroup.create({
    data: {
      eventId,
      name: input.name,
      phone: input.phone,
      inviteToken: newInviteToken(),
      guests: { create: input.guests.map((name) => ({ name })) },
    },
    include: withGuests,
  });
  return toGuestGroupData(group);
}

// Devuelve null si el grupo no existe o es de otro evento.
export async function updateGuestGroup(
  eventId: string,
  id: string,
  input: Partial<Omit<GuestGroupInput, 'guests'>>,
) {
  const { count } = await prisma.guestGroup.updateMany({ where: { id, eventId }, data: input });
  if (!count) {
    return null;
  }
  const group = await prisma.guestGroup.findUniqueOrThrow({ where: { id }, include: withGuests });
  return toGuestGroupData(group);
}

// Borra el grupo con sus personas. Devuelve false si no existe o es de otro evento.
export async function deleteGuestGroup(eventId: string, id: string) {
  const { count } = await prisma.guestGroup.deleteMany({ where: { id, eventId } });
  return count > 0;
}
