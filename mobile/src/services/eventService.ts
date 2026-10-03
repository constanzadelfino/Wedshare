import { Event, EventChanges, NewEvent } from '../models/Event';
import { apiRequest } from './apiClient';

export function listEvents() {
  return apiRequest<Event[]>('GET', '/events');
}

// Cada cuenta tiene un solo casamiento: devuelve ese evento, o null si todavía no lo creó.
export async function getMyEvent() {
  const events = await listEvents();
  return events[0] ?? null;
}

export function createEvent(event: NewEvent) {
  return apiRequest<Event>('POST', '/events', event);
}

export function updateEvent(id: string, changes: EventChanges) {
  return apiRequest<Event>('PATCH', `/events/${id}`, changes);
}

// Sube una foto de portada (ya achicada) desde el archivo del celular.
export function uploadCoverPhoto(id: string, fileUri: string) {
  const form = new FormData();
  // React Native acepta { uri, name, type } como archivo dentro de un FormData.
  form.append('photo', { uri: fileUri, name: 'portada.jpg', type: 'image/jpeg' } as unknown as Blob);
  return apiRequest<Event>('POST', `/events/${id}/cover-photos`, form);
}

export function removeCoverPhoto(id: string, index: number) {
  return apiRequest<Event>('DELETE', `/events/${id}/cover-photos/${index}`);
}
