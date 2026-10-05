import { isValidDate } from './event';

// Tipo de cada parte del casamiento. Hay como máximo una de cada una por casamiento.
export const EVENT_ITEM_KINDS = ['party', 'ceremony', 'civil'] as const;
export type EventItemKind = (typeof EVENT_ITEM_KINDS)[number];

// Cada parte del casamiento (festejo, ceremonia o civil), como la manda y la recibe la app.
export type EventItemData = {
  id: string;
  kind: EventItemKind;
  // Formato AAAA-MM-DD.
  date: string;
  // Formato HH:MM.
  time: string;
  venueName: string;
  address: string;
  // Datos de Google Maps, si la dirección se eligió del autocompletado.
  placeId: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type EventItemInput = Omit<EventItemData, 'id'>;

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const REQUIRED_TEXT_FIELDS = {
  venueName: 'Escribí el nombre del lugar.',
  address: 'Escribí la dirección.',
} as const;

type ValidationResult = { data: Partial<EventItemInput>; error?: undefined } | { error: string };

// Al crear, todo es obligatorio salvo los datos de Google Maps; al editar (partial),
// se puede mandar solo lo que cambia.
export function validateEventItemInput(body: unknown, partial: boolean): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del evento.' };
  }
  const input = body as Record<string, unknown>;
  const data: Partial<EventItemInput> = {};

  if (input.kind !== undefined || !partial) {
    if (!EVENT_ITEM_KINDS.includes(input.kind as EventItemKind)) {
      return { error: 'Elegí si es el festejo, la ceremonia o el civil.' };
    }
    data.kind = input.kind as EventItemKind;
  }

  for (const [field, message] of Object.entries(REQUIRED_TEXT_FIELDS)) {
    const value = input[field];
    if (value === undefined && partial) {
      continue;
    }
    if (typeof value !== 'string' || !value.trim() || value.trim().length > 200) {
      return { error: message };
    }
    data[field as keyof typeof REQUIRED_TEXT_FIELDS] = value.trim();
  }

  if (input.date !== undefined || !partial) {
    if (typeof input.date !== 'string' || !isValidDate(input.date)) {
      return { error: 'Revisá la fecha: tiene que tener el formato AAAA-MM-DD.' };
    }
    data.date = input.date;
  }

  if (input.time !== undefined || !partial) {
    if (typeof input.time !== 'string' || !TIME_PATTERN.test(input.time)) {
      return { error: 'Revisá la hora: tiene que tener el formato HH:MM.' };
    }
    data.time = input.time;
  }

  // Los datos de Google Maps van juntos: o están los tres, o ninguno.
  if (input.placeId !== undefined || input.latitude !== undefined || input.longitude !== undefined) {
    const { placeId, latitude, longitude } = input;
    if (placeId === null || placeId === '') {
      data.placeId = null;
      data.latitude = null;
      data.longitude = null;
    } else if (
      typeof placeId !== 'string' ||
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    ) {
      return { error: 'Los datos del mapa no son válidos. Volvé a elegir la dirección.' };
    } else {
      data.placeId = placeId;
      data.latitude = latitude;
      data.longitude = longitude;
    }
  }

  return { data };
}
