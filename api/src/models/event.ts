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
};

export type EventInput = Omit<EventData, 'id'>;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const BOOLEAN_FIELDS = ['calendarSync', 'playlistEnabled', 'giftsEnabled'] as const;

function isValidDate(value: string) {
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

  return { data };
}
