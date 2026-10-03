import { randomBytes } from 'node:crypto';

import { Guest, GuestGroup } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { GuestGroupData, GuestGroupInput, GuestGroupUpdate } from '../models/guest';

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
export async function updateGuestGroup(eventId: string, id: string, input: GuestGroupUpdate) {
  const { guests, ...groupData } = input;
  const group = await prisma.guestGroup.findFirst({ where: { id, eventId }, select: { id: true } });
  if (!group) {
    return null;
  }

  await prisma.$transaction(async (tx) => {
    await tx.guestGroup.update({ where: { id }, data: groupData });
    if (guests) {
      const keptIds = guests.flatMap((guest) => (guest.id ? [guest.id] : []));
      // Las personas que ya no están en la lista se quitan del grupo.
      await tx.guest.deleteMany({ where: { groupId: id, id: { notIn: keptIds } } });
      for (const guest of guests) {
        if (guest.id) {
          // Solo se renombra si la persona es de este grupo; un id ajeno no hace nada.
          await tx.guest.updateMany({ where: { id: guest.id, groupId: id }, data: { name: guest.name } });
        } else {
          await tx.guest.create({ data: { groupId: id, name: guest.name } });
        }
      }
    }
  });

  const updated = await prisma.guestGroup.findUniqueOrThrow({ where: { id }, include: withGuests });
  return toGuestGroupData(updated);
}

// Borra el grupo con sus personas. Devuelve false si no existe o es de otro evento.
export async function deleteGuestGroup(eventId: string, id: string) {
  const { count } = await prisma.guestGroup.deleteMany({ where: { id, eventId } });
  return count > 0;
}
