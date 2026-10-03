// Cada parte del casamiento: civil, ceremonia, festejo u otra.
export type EventItem = {
  id: string;
  name: string;
  // Formato AAAA-MM-DD.
  date: string;
  // Formato HH:MM.
  time: string;
  venueName: string;
  address: string;
  // Datos de Google Maps, si la dirección se eligió de las sugerencias.
  placeId: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type EventItemInput = Omit<EventItem, 'id'>;

// Nombres que se ofrecen como atajo al agregar un evento.
export const SUGGESTED_EVENT_ITEM_NAMES = ['Civil', 'Ceremonia', 'Festejo'];
