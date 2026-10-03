import { Event } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { EventData, EventInput } from '../models/event';

// Todas las consultas filtran por ownerId: cada pareja solo ve y toca sus eventos.

function toEventData(event: Event): EventData {
  return {
    id: event.id,
    name: event.name,
    date: event.date.toISOString().slice(0, 10),
    venue: event.venue,
    calendarSync: event.calendarSync,
    playlistEnabled: event.playlistEnabled,
    giftsEnabled: event.giftsEnabled,
  };
}

// La base guarda solo la fecha; Prisma la maneja como Date a las 00:00 UTC.
function toDbDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export async function listEvents(ownerId: string) {
  const events = await prisma.event.findMany({ where: { ownerId }, orderBy: { date: 'asc' } });
  return events.map(toEventData);
}

export async function getEvent(ownerId: string, id: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  return event ? toEventData(event) : null;
}

// Cada cuenta tiene un solo casamiento.
export async function hasEvent(ownerId: string) {
  return (await prisma.event.count({ where: { ownerId } })) > 0;
}

export async function createEvent(ownerId: string, input: EventInput) {
  const event = await prisma.event.create({
    data: { ...input, ownerId, date: toDbDate(input.date) },
  });
  return toEventData(event);
}

// Devuelve null si el evento no existe o es de otra persona.
export async function updateEvent(ownerId: string, id: string, input: Partial<EventInput>) {
  const { date, ...rest } = input;
  const { count } = await prisma.event.updateMany({
    where: { id, ownerId },
    data: date ? { ...rest, date: toDbDate(date) } : rest,
  });
  return count ? getEvent(ownerId, id) : null;
}

// Devuelve false si el evento no existe o es de otra persona.
export async function deleteEvent(ownerId: string, id: string) {
  const { count } = await prisma.event.deleteMany({ where: { id, ownerId } });
  return count > 0;
}
