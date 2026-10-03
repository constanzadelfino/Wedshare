import { prisma } from '../lib/prisma';
import { EntryPassData } from '../models/entry';

// Los QR se buscan siempre dentro del evento del usuario: un QR de otro casamiento no se reconoce.

async function findGroup(eventId: string, entryCode: string) {
  return prisma.guestGroup.findFirst({
    where: { eventId, entryCode },
    include: {
      // El pase vale solo para las personas confirmadas.
      guests: {
        where: { status: 'confirmed' },
        include: { entryCheck: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

// Devuelve null si el código no es de un grupo de este evento.
export async function getEntryPass(eventId: string, entryCode: string): Promise<EntryPassData | null> {
  const group = await findGroup(eventId, entryCode);
  if (!group) {
    return null;
  }
  return {
    groupName: group.name,
    guests: group.guests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      enteredAt: guest.entryCheck ? guest.entryCheck.createdAt.toISOString() : null,
    })),
  };
}

// Registra el ingreso de las personas elegidas. Solo cuenta a las confirmadas de este grupo;
// si alguna ya había entrado, se deja su primer ingreso. Devuelve null si el código no existe.
export async function registerEntry(eventId: string, entryCode: string, guestIds: string[]) {
  const group = await findGroup(eventId, entryCode);
  if (!group) {
    return null;
  }
  const allowedIds = new Set(group.guests.map((guest) => guest.id));
  await prisma.entryCheck.createMany({
    data: guestIds.filter((id) => allowedIds.has(id)).map((guestId) => ({ guestId })),
    skipDuplicates: true,
  });
  return getEntryPass(eventId, entryCode);
}
