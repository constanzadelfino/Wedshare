import { Invitation, RsvpInput } from '../models/Invitation';
import { apiRequest } from './apiClient';

function invitationPath(inviteToken: string) {
  return `/invitations/${encodeURIComponent(inviteToken)}`;
}

export function getInvitation(inviteToken: string) {
  return apiRequest<Invitation>(invitationPath(inviteToken));
}

// Primera respuesta del grupo. Devuelve la invitación actualizada.
export function createRsvp(inviteToken: string, input: RsvpInput) {
  return apiRequest<Invitation>(`${invitationPath(inviteToken)}/rsvp`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

// Cambio de respuesta. Devuelve la invitación actualizada.
export function updateRsvp(inviteToken: string, input: RsvpInput) {
  return apiRequest<Invitation>(`${invitationPath(inviteToken)}/rsvp`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}
