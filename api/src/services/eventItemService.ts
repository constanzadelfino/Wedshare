import { EventItem } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { EventItemData, EventItemInput } from '../models/eventItem';

// Siempre se buscan a través del evento del usuario: cada pareja solo ve y toca lo suyo.

function toEventItemData(item: EventItem): EventItemData {
  return {
    id: item.id,
    name: item.name,
    date: item.date.toISOString().slice(0, 10),
    time: item.time,
    venueName: item.venueName,
    address: item.address,
    placeId: item.placeId,
    latitude: item.latitude,
    longitude: item.longitude,
  };
}

function toDbData(input: Partial<EventItemInput>) {
  const { date, ...rest } = input;
  return date ? { ...rest, date: new Date(`${date}T00:00:00Z`) } : rest;
}

// En orden cronológico.
export async function listEventItems(eventId: string) {
  const items = await prisma.eventItem.findMany({
    where: { eventId },
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
  });
  return items.map(toEventItemData);
}

export async function createEventItem(eventId: string, input: EventItemInput) {
  const item = await prisma.eventItem.create({
    data: { ...input, eventId, date: new Date(`${input.date}T00:00:00Z`) },
  });
  return toEventItemData(item);
}

// Devuelve null si no existe o es de otro evento.
export async function updateEventItem(eventId: string, id: string, input: Partial<EventItemInput>) {
  const { count } = await prisma.eventItem.updateMany({ where: { id, eventId }, data: toDbData(input) });
  if (!count) {
    return null;
  }
  return toEventItemData(await prisma.eventItem.findUniqueOrThrow({ where: { id } }));
}

// Devuelve false si no existe o es de otro evento.
export async function deleteEventItem(eventId: string, id: string) {
  const { count } = await prisma.eventItem.deleteMany({ where: { id, eventId } });
  return count > 0;
}
