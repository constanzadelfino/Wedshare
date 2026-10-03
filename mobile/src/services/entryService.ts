import { EntryPass } from '../models/Entry';
import { apiRequest } from './apiClient';

export function getEntryPass(code: string) {
  return apiRequest<EntryPass>('GET', `/entry-passes/${encodeURIComponent(code)}`);
}

// Registra el ingreso de las personas que entran en este momento.
export function registerEntry(code: string, guestIds: string[]) {
  return apiRequest<EntryPass>('POST', `/entry-passes/${encodeURIComponent(code)}/checks`, { guestIds });
}
