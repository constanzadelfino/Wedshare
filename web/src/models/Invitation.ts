// Datos de la invitación tal como los manda la API (GET /invitations/:token).

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type InvitationGuest = {
  id: string;
  name: string;
  status: GuestStatus;
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
    dressCode: string | null;
    items: InvitationItem[];
  };
};
