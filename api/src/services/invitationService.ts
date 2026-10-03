import { prisma } from '../lib/prisma';
import { getStorageClient, publicPhotoUrl } from '../lib/storage';
import { InvitationData } from '../models/invitation';

// Consultas de la web del invitado. No hay sesión: el grupo se busca por su invite_token,
// y desde ahí solo se llega a su propio evento.

function fromDbDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Devuelve null si no hay ningún grupo con ese token.
export async function getInvitation(inviteToken: string): Promise<InvitationData | null> {
  const group = await prisma.guestGroup.findUnique({
    where: { inviteToken },
    include: {
      guests: { orderBy: { createdAt: 'asc' } },
      event: { include: { items: { orderBy: [{ date: 'asc' }, { time: 'asc' }] } } },
    },
  });
  if (!group) {
    return null;
  }

  const { event } = group;
  const storage = getStorageClient();
  return {
    group: {
      name: group.name,
      guests: group.guests.map((guest) => ({ id: guest.id, name: guest.name, status: guest.status })),
    },
    event: {
      name: event.name,
      coupleNames: event.coupleNames,
      date: fromDbDate(event.date),
      venue: event.venue,
      welcomeMessage: event.welcomeMessage,
      coverPhotoUrls: storage ? event.coverPhotos.map((path) => publicPhotoUrl(storage, path)) : [],
      coverWithoutPhotos: event.coverWithoutPhotos,
      rsvpDeadline: event.rsvpDeadline ? fromDbDate(event.rsvpDeadline) : null,
      dressCode: event.dressCode,
      items: event.items.map((item) => ({
        id: item.id,
        name: item.name,
        date: fromDbDate(item.date),
        time: item.time,
        venueName: item.venueName,
        address: item.address,
        placeId: item.placeId,
        latitude: item.latitude,
        longitude: item.longitude,
      })),
    },
  };
}
