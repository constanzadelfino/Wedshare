// Datos de un evento tal como los manda y los recibe la app.
// La tabla en sí está definida en prisma/schema.prisma.
export type EventData = {
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
  // Direcciones públicas de las fotos de portada, en orden.
  coverPhotoUrls: string[];
  coverWithoutPhotos: boolean;
  // Personalizar → Eventos. Fecha en formato AAAA-MM-DD.
  rsvpDeadline: string | null;
  dressCode: string | null;
};

// Lo que la app puede mandar al crear o editar. Las fotos se suben por otra ruta.
export type EventInput = Omit<EventData, 'id' | 'coverPhotoUrls'>;

export const MAX_COVER_PHOTOS = 3;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const BOOLEAN_FIELDS = [
  'calendarSync',
  'playlistEnabled',
  'giftsEnabled',
  'coverWithoutPhotos',
] as const;
// Textos opcionales con su largo máximo. Vacío equivale a no tenerlo (null).
const OPTIONAL_TEXT_FIELDS = {
  coupleNames: { max: 80, label: 'Los nombres' },
  welcomeMessage: { max: 600, label: 'El mensaje de bienvenida' },
  dressCode: { max: 200, label: 'El dress code' },
} as const;

export function isValidDate(value: string) {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  // Descarta fechas que no existen, como 2026-02-30.
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

type ValidationResult = { data: Partial<EventInput>; error?: undefined } | { error: string };

// Revisa lo que llega en el pedido. Al crear, nombre, fecha y lugar son obligatorios;
// al editar (partial), se puede mandar solo lo que cambia.
export function validateEventInput(body: unknown, partial: boolean): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del evento.' };
  }
  const input = body as Record<string, unknown>;
  const data: Partial<EventInput> = {};

  for (const field of ['name', 'venue'] as const) {
    const value = input[field];
    if (value === undefined && partial) {
      continue;
    }
    if (typeof value !== 'string' || !value.trim()) {
      return { error: field === 'name' ? 'Escribí el nombre del evento.' : 'Escribí el lugar.' };
    }
    data[field] = value.trim();
  }

  if (input.date !== undefined || !partial) {
    if (typeof input.date !== 'string' || !isValidDate(input.date)) {
      return { error: 'Revisá la fecha: tiene que tener el formato AAAA-MM-DD.' };
    }
    data.date = input.date;
  }

  for (const field of BOOLEAN_FIELDS) {
    const value = input[field];
    if (value === undefined) {
      continue;
    }
    if (typeof value !== 'boolean') {
      return { error: `El campo ${field} tiene que ser verdadero o falso.` };
    }
    data[field] = value;
  }

  for (const [field, { max, label }] of Object.entries(OPTIONAL_TEXT_FIELDS)) {
    const value = input[field];
    if (value === undefined) {
      continue;
    }
    if (value !== null && typeof value !== 'string') {
      return { error: `${label} tiene que ser un texto.` };
    }
    const text = value?.trim() || null;
    if (text && text.length > max) {
      return { error: `${label} puede tener hasta ${max} caracteres.` };
    }
    data[field as keyof typeof OPTIONAL_TEXT_FIELDS] = text;
  }

  if (input.rsvpDeadline !== undefined) {
    if (input.rsvpDeadline === null || input.rsvpDeadline === '') {
      data.rsvpDeadline = null;
    } else if (typeof input.rsvpDeadline !== 'string' || !isValidDate(input.rsvpDeadline)) {
      return { error: 'Revisá la fecha límite: tiene que tener el formato AAAA-MM-DD.' };
    } else {
      data.rsvpDeadline = input.rsvpDeadline;
    }
  }

  return { data };
}
