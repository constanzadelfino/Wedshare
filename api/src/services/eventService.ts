import { randomUUID } from 'node:crypto';

import { Event } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import {
  COVER_PHOTOS_BUCKET,
  ensureCoverPhotosBucket,
  getStorageClient,
  publicPhotoUrl,
} from '../lib/storage';
import { EventData, EventInput, MAX_COVER_PHOTOS } from '../models/event';

// Todas las consultas filtran por ownerId: cada pareja solo ve y toca sus eventos.

// La base guarda solo la fecha; Prisma la maneja como Date a las 00:00 UTC.
function toDbDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function fromDbDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toEventData(event: Event): EventData {
  const storage = getStorageClient();
  return {
    id: event.id,
    name: event.name,
    date: fromDbDate(event.date),
    venue: event.venue,
    calendarSync: event.calendarSync,
    playlistEnabled: event.playlistEnabled,
    giftsEnabled: event.giftsEnabled,
    coupleNames: event.coupleNames,
    welcomeMessage: event.welcomeMessage,
    coverPhotoUrls: storage ? event.coverPhotos.map((path) => publicPhotoUrl(storage, path)) : [],
    coverWithoutPhotos: event.coverWithoutPhotos,
    rsvpDeadline: event.rsvpDeadline ? fromDbDate(event.rsvpDeadline) : null,
    dressCode: event.dressCode,
  };
}

function toDbData(input: Partial<EventInput>) {
  const { date, rsvpDeadline, ...rest } = input;
  return {
    ...rest,
    ...(date ? { date: toDbDate(date) } : {}),
    ...(rsvpDeadline !== undefined
      ? { rsvpDeadline: rsvpDeadline ? toDbDate(rsvpDeadline) : null }
      : {}),
  };
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

// Devuelve el id del evento del usuario, o null si todavía no lo creó.
export async function getOwnerEventId(ownerId: string) {
  const event = await prisma.event.findUnique({ where: { ownerId }, select: { id: true } });
  return event?.id ?? null;
}

export async function createEvent(
  ownerId: string,
  input: Pick<EventInput, 'name' | 'date' | 'venue'> & Partial<EventInput>,
) {
  const event = await prisma.event.create({
    data: { ...toDbData(input), name: input.name, venue: input.venue, ownerId, date: toDbDate(input.date) },
  });
  return toEventData(event);
}

// Devuelve null si el evento no existe o es de otra persona.
export async function updateEvent(ownerId: string, id: string, input: Partial<EventInput>) {
  const { count } = await prisma.event.updateMany({ where: { id, ownerId }, data: toDbData(input) });
  return count ? getEvent(ownerId, id) : null;
}

// Devuelve false si el evento no existe o es de otra persona.
export async function deleteEvent(ownerId: string, id: string) {
  const { count } = await prisma.event.deleteMany({ where: { id, ownerId } });
  return count > 0;
}

// Errores de las fotos, con el mensaje listo para mostrar.
export class CoverPhotoError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function requireStorage() {
  const storage = getStorageClient();
  if (!storage) {
    throw new CoverPhotoError(
      'La subida de fotos todavía no está configurada (falta SUPABASE_SECRET_KEY en la API).',
      503,
    );
  }
  return storage;
}

// Sube una foto de portada al final de la lista. Devuelve null si el evento no es del usuario.
export async function addCoverPhoto(ownerId: string, id: string, file: Buffer, mimeType: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  if (event.coverPhotos.length >= MAX_COVER_PHOTOS) {
    throw new CoverPhotoError(`Podés subir hasta ${MAX_COVER_PHOTOS} fotos de portada.`, 400);
  }

  const storage = requireStorage();
  await ensureCoverPhotosBucket(storage);
  const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
  const path = `${event.id}/${randomUUID()}.${extension}`;
  const { error } = await storage.storage
    .from(COVER_PHOTOS_BUCKET)
    .upload(path, file, { contentType: mimeType });
  if (error) {
    throw error;
  }

  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { coverPhotos: { push: path } },
  });
  return toEventData(updated);
}

// Quita la foto de la posición indicada (0, 1 o 2). Devuelve null si el evento no es del usuario.
export async function removeCoverPhoto(ownerId: string, id: string, index: number) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  const path = event.coverPhotos[index];
  if (!path) {
    throw new CoverPhotoError('No encontramos esa foto.', 404);
  }

  const storage = requireStorage();
  await storage.storage.from(COVER_PHOTOS_BUCKET).remove([path]);
  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { coverPhotos: event.coverPhotos.filter((_, i) => i !== index) },
  });
  return toEventData(updated);
}
