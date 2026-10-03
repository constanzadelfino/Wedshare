import { EventItem, EventItemInput } from '../models/EventItem';
import { apiRequest } from './apiClient';

export function listEventItems() {
  return apiRequest<EventItem[]>('GET', '/event-items');
}

export function createEventItem(item: EventItemInput) {
  return apiRequest<EventItem>('POST', '/event-items', item);
}

export function updateEventItem(id: string, changes: Partial<EventItemInput>) {
  return apiRequest<EventItem>('PATCH', `/event-items/${id}`, changes);
}

export function deleteEventItem(id: string) {
  return apiRequest<void>('DELETE', `/event-items/${id}`);
}
