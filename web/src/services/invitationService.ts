import { Invitation, RsvpInput } from '../models/Invitation';
import { apiRequest } from './apiClient';

function invitationPath(inviteToken: string) {
  return `/invitations/${encodeURIComponent(inviteToken)}`;
}

export function getInvitation(inviteToken: string) {
  return apiRequest<Invitation>(invitationPath(inviteToken));
}

// Vista previa de los novios: su invitación con una familia de ejemplo.
export function getPreview(previewToken: string) {
  return apiRequest<Invitation>(`/invitations/preview/${encodeURIComponent(previewToken)}`);
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
