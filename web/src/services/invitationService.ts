import { Invitation } from '../models/Invitation';
import { apiRequest } from './apiClient';

export function getInvitation(inviteToken: string) {
  return apiRequest<Invitation>(`/invitations/${encodeURIComponent(inviteToken)}`);
}
