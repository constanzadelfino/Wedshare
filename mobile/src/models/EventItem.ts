// Tipo de cada parte del casamiento. Hay como máximo una de cada una por casamiento.
export type EventItemKind = 'party' | 'ceremony' | 'civil';

// En este orden se ofrecen al agregar (pedido de Constanza).
export const EVENT_ITEM_KINDS: { value: EventItemKind; label: string }[] = [
  { value: 'party', label: 'Festejo' },
  { value: 'ceremony', label: 'Ceremonia' },
  { value: 'civil', label: 'Civil' },
];

export function eventItemLabel(kind: EventItemKind) {
  return EVENT_ITEM_KINDS.find((option) => option.value === kind)?.label ?? '';
}

// Cada parte del casamiento: festejo, ceremonia o civil.
export type EventItem = {
  id: string;
  kind: EventItemKind;
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
