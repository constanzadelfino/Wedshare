import { randomBytes, randomUUID } from 'node:crypto';

import { Event } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import {
  COVER_PHOTOS_BUCKET,
  ensureCoverPhotosBucket,
  getStorageClient,
  publicPhotoUrl,
} from '../lib/storage';
import { EventData, EventInput, MAX_ALBUM_PHOTOS, MAX_COVER_PHOTOS } from '../models/event';

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
    giftBank: event.giftBank,
    giftHolder: event.giftHolder,
    giftAlias: event.giftAlias,
    giftCbu: event.giftCbu,
    giftMailbox: event.giftMailbox,
    spotifyPlaylistUrl: event.spotifyPlaylistUrl,
    storyTitle: event.storyTitle,
    storyText: event.storyText,
    storyPhotoUrl: storage && event.storyPhoto ? publicPhotoUrl(storage, event.storyPhoto) : null,
    albumPhotoUrls: storage ? event.albumPhotos.map((path) => publicPhotoUrl(storage, path)) : [],
    closingPhrase: event.closingPhrase,
    template: event.template,
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

// Token del link de vista previa. Se crea la primera vez que se pide y después no cambia.
// Devuelve null si el evento no existe o es de otra persona.
export async function getPreviewToken(ownerId: string, id: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId }, select: { previewToken: true } });
  if (!event) {
    return null;
  }
  if (event.previewToken) {
    return event.previewToken;
  }
  // Mismo formato que los links de los invitados: 16 bytes al azar, 22 caracteres.
  const previewToken = randomBytes(16).toString('base64url');
  await prisma.event.update({ where: { id }, data: { previewToken } });
  return previewToken;
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

// Sube una foto del evento a Storage y devuelve su ruta. Los nombres son al azar.
async function storePhoto(eventId: string, file: Buffer, mimeType: string, folder = '') {
  const storage = requireStorage();
  await ensureCoverPhotosBucket(storage);
  const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
  const path = `${eventId}/${folder}${randomUUID()}.${extension}`;
  const { error } = await storage.storage.from(COVER_PHOTOS_BUCKET).upload(path, file, { contentType: mimeType });
  if (error) {
    throw error;
  }
  return path;
}

// Borra fotos de Storage. Si falla, no se corta lo que se estaba haciendo.
async function deleteStoredPhotos(paths: string[]) {
  const storage = getStorageClient();
  if (storage && paths.length > 0) {
    await storage.storage.from(COVER_PHOTOS_BUCKET).remove(paths);
  }
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

  const path = await storePhoto(event.id, file, mimeType);
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

// Pone (o reemplaza) la foto de la historia. Devuelve null si el evento no es del usuario.
export async function setStoryPhoto(ownerId: string, id: string, file: Buffer, mimeType: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  const path = await storePhoto(event.id, file, mimeType, 'story/');
  const updated = await prisma.event.update({ where: { id: event.id }, data: { storyPhoto: path } });
  await deleteStoredPhotos(event.storyPhoto ? [event.storyPhoto] : []);
  return toEventData(updated);
}

// Quita la foto de la historia. Devuelve null si el evento no es del usuario.
export async function removeStoryPhoto(ownerId: string, id: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  const updated = await prisma.event.update({ where: { id: event.id }, data: { storyPhoto: null } });
  await deleteStoredPhotos(event.storyPhoto ? [event.storyPhoto] : []);
  return toEventData(updated);
}

// Suma una foto al final del álbum. Devuelve null si el evento no es del usuario.
export async function addAlbumPhoto(ownerId: string, id: string, file: Buffer, mimeType: string) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  if (event.albumPhotos.length >= MAX_ALBUM_PHOTOS) {
    throw new CoverPhotoError(`El álbum puede tener hasta ${MAX_ALBUM_PHOTOS} fotos.`, 400);
  }
  const path = await storePhoto(event.id, file, mimeType, 'album/');
  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { albumPhotos: { push: path } },
  });
  return toEventData(updated);
}

// Quita la foto del álbum de la posición indicada. Devuelve null si el evento no es del usuario.
export async function removeAlbumPhoto(ownerId: string, id: string, index: number) {
  const event = await prisma.event.findFirst({ where: { id, ownerId } });
  if (!event) {
    return null;
  }
  const path = event.albumPhotos[index];
  if (!path) {
    throw new CoverPhotoError('No encontramos esa foto.', 404);
  }
  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { albumPhotos: event.albumPhotos.filter((_, i) => i !== index) },
  });
  await deleteStoredPhotos([path]);
  return toEventData(updated);
}
