import { GuestStatus } from './guest';

// Lo que ve un invitado al abrir su link. Es público para quien tenga el token,
// así que solo lleva lo que se muestra en la invitación: nada del dueño ni de otros grupos.
export type InvitationData = {
  group: {
    name: string;
    guests: { id: string; name: string; status: GuestStatus }[];
  };
  event: {
    // Nombre del evento. Se muestra si los novios no cargaron sus nombres.
    name: string;
    coupleNames: string | null;
    // Formato AAAA-MM-DD.
    date: string;
    venue: string;
    welcomeMessage: string | null;
    // Direcciones públicas de las fotos de portada, en orden.
    coverPhotoUrls: string[];
    coverWithoutPhotos: boolean;
    // Formato AAAA-MM-DD.
    rsvpDeadline: string | null;
    dressCode: string | null;
    // Civil, ceremonia, festejo u otros, en orden cronológico.
    items: {
      id: string;
      name: string;
      date: string;
      // Formato HH:MM, en horario de Argentina.
      time: string;
      venueName: string;
      address: string;
      placeId: string | null;
      latitude: number | null;
      longitude: number | null;
    }[];
  };
};

// Los tokens se generan con 16 bytes al azar en base64url: 22 caracteres.
const INVITE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22}$/;

export function isInviteToken(value: string) {
  return INVITE_TOKEN_PATTERN.test(value);
}
