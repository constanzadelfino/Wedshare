import { Gift, GiftChanges } from '../models/Gift';
import { apiRequest } from './apiClient';

export function listGifts() {
  return apiRequest<Gift[]>('GET', '/gifts');
}

export function createGift(gift: GiftChanges) {
  return apiRequest<Gift>('POST', '/gifts', gift);
}

export function updateGift(id: string, changes: Partial<GiftChanges>) {
  return apiRequest<Gift>('PATCH', `/gifts/${id}`, changes);
}

export function deleteGift(id: string) {
  return apiRequest<void>('DELETE', `/gifts/${id}`);
}
