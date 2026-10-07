import { TemplateId } from './Template';

// Un casamiento, tal como lo devuelve la API.
export type Event = {
  id: string;
  name: string;
  // Formato AAAA-MM-DD.
  date: string;
  venue: string;
  calendarSync: boolean;
  playlistEnabled: boolean;
  giftsEnabled: boolean;
  // Personalizar → Portada.
  coupleNames: string | null;
  welcomeMessage: string | null;
  // Direcciones de las fotos de portada, en orden (hasta 3).
  coverPhotoUrls: string[];
  coverWithoutPhotos: boolean;
  // Personalizar → Eventos. Fecha en formato AAAA-MM-DD.
  rsvpDeadline: string | null;
  dressCode: string | null;
  // Regalos: cuenta bancaria (la usan los regalos por transferencia) y buzón en el salón.
  giftBank: string | null;
  giftHolder: string | null;
  giftAlias: string | null;
  // 22 números (CBU o CVU).
  giftCbu: string | null;
  giftMailbox: boolean;
  // Link a una playlist de Spotify (la invitación muestra su reproductor).
  spotifyPlaylistUrl: string | null;
  // Historia, álbum y frase final. Las fotos se suben aparte.
  storyTitle: string | null;
  storyText: string | null;
  storyPhotoUrl: string | null;
  albumPhotoUrls: string[];
  closingPhrase: string | null;
  // Plantilla de la invitación.
  template: TemplateId;
};

export type NewEvent = Pick<
  Event,
  'name' | 'date' | 'venue' | 'calendarSync' | 'playlistEnabled' | 'giftsEnabled'
>;

// Lo que se puede cambiar desde Personalizar. Las fotos se suben aparte.
export type EventChanges = Partial<Omit<Event, 'id' | 'coverPhotoUrls' | 'storyPhotoUrl' | 'albumPhotoUrls'>>;

export const MAX_COVER_PHOTOS = 3;
export const MAX_ALBUM_PHOTOS = 8;

// El link de "Invitar colaboradores" de Spotify trae pt=...: con ese, los invitados pueden
// sumar canciones a la playlist.
export function isCollaborativeLink(url: string) {
  return /[?&]pt=/.test(url);
}
