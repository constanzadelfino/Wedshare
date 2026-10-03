import { GuestGroup, GuestGroupChanges, NewGuestGroup } from '../models/Guest';
import { apiRequest } from './apiClient';

export function listGuestGroups() {
  return apiRequest<GuestGroup[]>('GET', '/guest-groups');
}

export function createGuestGroup(group: NewGuestGroup) {
  return apiRequest<GuestGroup>('POST', '/guest-groups', group);
}

// La lista de personas reemplaza a la anterior: las que traen id se conservan con su respuesta.
export function updateGuestGroup(id: string, changes: GuestGroupChanges) {
  return apiRequest<GuestGroup>('PATCH', `/guest-groups/${id}`, changes);
}

export function deleteGuestGroup(id: string) {
  return apiRequest<void>('DELETE', `/guest-groups/${id}`);
}
