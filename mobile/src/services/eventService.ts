import { File } from 'expo-file-system';

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

// Token del link de vista previa. La API lo crea la primera vez.
export async function getPreviewToken(id: string) {
  const { token } = await apiRequest<{ token: string }>('POST', `/events/${id}/preview`);
  return token;
}

// Sube una foto de portada (ya achicada) desde el archivo del celular.
// El fetch de Expo no acepta el formato { uri, name, type } de React Native:
// el archivo tiene que ir como File de expo-file-system.
export function uploadCoverPhoto(id: string, fileUri: string) {
  const form = new FormData();
  form.append('photo', new File(fileUri));
  return apiRequest<Event>('POST', `/events/${id}/cover-photos`, form);
}

export function removeCoverPhoto(id: string, index: number) {
  return apiRequest<Event>('DELETE', `/events/${id}/cover-photos/${index}`);
}
