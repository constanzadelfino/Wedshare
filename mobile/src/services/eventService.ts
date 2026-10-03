import { Event, NewEvent } from '../models/Event';
import { apiRequest } from './apiClient';

export function listEvents() {
  return apiRequest<Event[]>('GET', '/events');
}

export function createEvent(event: NewEvent) {
  return apiRequest<Event>('POST', '/events', event);
}
