import { GuestGroup, NewGuestGroup } from '../models/Guest';
import { apiRequest } from './apiClient';

export function listGuestGroups() {
  return apiRequest<GuestGroup[]>('GET', '/guest-groups');
}

export function createGuestGroup(group: NewGuestGroup) {
  return apiRequest<GuestGroup>('POST', '/guest-groups', group);
}
