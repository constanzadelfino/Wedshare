import { Gift } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { GiftData, GiftInput } from '../models/gift';

// Siempre se buscan a través del evento del usuario: cada pareja solo ve y toca lo suyo.

export function toGiftData(gift: Gift): GiftData {
  return {
    id: gift.id,
    name: gift.name,
    type: gift.type,
    price: gift.price,
    method: gift.method,
    url: gift.url,
    given: gift.given,
  };
}

// En el orden en que se cargaron.
export async function listGifts(eventId: string) {
  const gifts = await prisma.gift.findMany({ where: { eventId }, orderBy: { createdAt: 'asc' } });
  return gifts.map(toGiftData);
}

export async function createGift(eventId: string, input: GiftInput) {
  return toGiftData(await prisma.gift.create({ data: { ...input, eventId } }));
}

// Devuelve null si no existe o es de otro evento.
export async function updateGift(eventId: string, id: string, input: Partial<GiftInput>) {
  const { count } = await prisma.gift.updateMany({ where: { id, eventId }, data: input });
  if (!count) {
    return null;
  }
  return toGiftData(await prisma.gift.findUniqueOrThrow({ where: { id } }));
}

// Devuelve false si no existe o es de otro evento.
export async function deleteGift(eventId: string, id: string) {
  const { count } = await prisma.gift.deleteMany({ where: { id, eventId } });
  return count > 0;
}
