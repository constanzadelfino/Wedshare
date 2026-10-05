// Datos de la invitación tal como los manda la API (GET /invitations/:token).

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type InvitationGuest = {
  id: string;
  name: string;
  status: GuestStatus;
  // Preferencia alimentaria que anotó al confirmar.
  dietary: string | null;
};

// party: festejo. ceremony: ceremonia. civil: civil.
export type EventItemKind = 'party' | 'ceremony' | 'civil';

export const EVENT_ITEM_LABELS: Record<EventItemKind, string> = {
  party: 'Festejo',
  ceremony: 'Ceremonia',
  civil: 'Civil',
};

export type InvitationItem = {
  id: string;
  kind: EventItemKind;
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

export type GiftType = 'savings' | 'honeymoon' | 'experience' | 'home' | 'baby' | 'other';

export type GiftIdea = {
  name: string;
  // Elige el ícono del regalo.
  type: GiftType;
  // En pesos, sin centavos.
  price: number | null;
  // payment: link de pago (por ejemplo, de Mercado Pago). product: link de un producto.
  // transfer: transferencia a la cuenta bancaria de los novios.
  method: 'payment' | 'product' | 'transfer';
  // null en los regalos por transferencia.
  url: string | null;
  // Los novios lo marcan cuando ya se lo regalaron.
  given: boolean;
};

export type BankAccount = {
  bank: string | null;
  holder: string | null;
  alias: string | null;
  cbu: string | null;
};

export type InvitationGifts = {
  // null si los novios no cargaron la cuenta.
  bank: BankAccount | null;
  mailbox: boolean;
  ideas: GiftIdea[];
};

export type Invitation = {
  // true en la vista previa de los novios: la familia es de ejemplo y no se puede confirmar.
  preview: boolean;
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
    // Link a la playlist de Spotify de los novios. null si no hay.
    spotifyPlaylistUrl: string | null;
    // Sección Regalos. null si los novios la apagaron o no cargaron nada.
    gifts: InvitationGifts | null;
  };
};

// Lo que manda el invitado al confirmar o cambiar su respuesta.
export type RsvpInput = {
  // attending: true asiste, false no asiste, null todavía no sabe (queda pendiente).
  guests: { id: string; attending: boolean | null; dietary: string | null }[];
  message: string | null;
};
