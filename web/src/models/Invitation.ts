// Datos de la invitación tal como los manda la API (GET /invitations/:token).

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type InvitationGuest = {
  id: string;
  name: string;
  status: GuestStatus;
  // Preferencia alimentaria que anotó al confirmar.
  dietary: string | null;
};

export type InvitationItem = {
  id: string;
  // Civil, ceremonia, festejo u otro.
  name: string;
  // Formato AAAA-MM-DD.
  date: string;
  // Formato HH:MM, en horario de Argentina.
  time: string;
  venueName: string;
  address: string;
  placeId: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type Invitation = {
  group: {
    name: string;
    guests: InvitationGuest[];
    // La respuesta del grupo, si ya respondió.
    rsvp: { message: string | null } | null;
    // Lo que lleva el QR de ingreso. Solo viene si alguien del grupo confirmó.
    entryCode: string | null;
  };
  event: {
    // Nombre del evento. Se muestra si los novios no cargaron sus nombres.
    name: string;
    coupleNames: string | null;
    // Formato AAAA-MM-DD.
    date: string;
    venue: string;
    welcomeMessage: string | null;
    coverPhotoUrls: string[];
    coverWithoutPhotos: boolean;
    rsvpDeadline: string | null;
    // true si ya pasó la fecha límite: no se puede confirmar ni cambiar la respuesta.
    rsvpClosed: boolean;
    dressCode: string | null;
    items: InvitationItem[];
  };
};

// Lo que manda el invitado al confirmar o cambiar su respuesta.
export type RsvpInput = {
  guests: { id: string; attending: boolean; dietary: string | null }[];
  message: string | null;
};
