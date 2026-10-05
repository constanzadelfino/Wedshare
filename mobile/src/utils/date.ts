// Mientras se escribe la fecha, deja solo números y agrega las barras: 20032027 → 20/03/2027.
export function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean);
  return parts.join('/');
}

// Convierte DD/MM/AAAA a AAAA-MM-DD, el formato de la API. Devuelve null si la fecha no existe.
export function displayDateToIso(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) {
    return null;
  }
  const [, day, month, year] = match;
  const iso = `${year}-${month}-${day}`;
  const date = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(iso) ? iso : null;
}

// Convierte AAAA-MM-DD a DD/MM/AAAA para mostrar.
export function isoDateToDisplay(iso: string) {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

// Mientras se escribe la hora, deja solo números y agrega los dos puntos: 2130 → 21:30.
export function formatTimeInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
}

export function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

// Convierte AAAA-MM-DD a DD/MM, para las tarjetas de eventos.
export function isoDateToShortDisplay(iso: string) {
  const [, month, day] = iso.split('-');
  return `${day}/${month}`;
}

// Fecha de hoy en AAAA-MM-DD, según la hora del celular.
export function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// Hora de un momento ISO en el horario del celular, como "21:40".
export function isoToTime(iso: string) {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// Convierte AAAA-MM-DD a "20 de marzo de 2027".
export function isoDateToLongDisplay(iso: string) {
  const [year, month, day] = iso.split('-');
  return `${Number(day)} de ${MONTHS[Number(month) - 1]} de ${year}`;
}

// Días que faltan desde hoy (según el celular) hasta una fecha AAAA-MM-DD. Negativo si ya pasó.
export function daysUntil(iso: string) {
  const toUtcDay = (value: string) => Date.parse(`${value}T00:00:00Z`);
  return Math.round((toUtcDay(iso) - toUtcDay(todayIso())) / 86_400_000);
}
