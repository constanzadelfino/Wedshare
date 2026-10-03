// Datos de los invitados tal como los manda y los recibe la app.
// Las tablas están definidas en prisma/schema.prisma.

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type GuestData = {
  id: string;
  name: string;
  status: GuestStatus;
};

export type GuestGroupData = {
  id: string;
  name: string;
  phone: string | null;
  // Va en el link de la invitación del grupo.
  inviteToken: string;
  guests: GuestData[];
};

export type GuestGroupInput = {
  name: string;
  phone: string | null;
  // Nombres de las personas del grupo.
  guests: string[];
};

export const MAX_GUESTS_PER_GROUP = 20;

const PHONE_CHARACTERS = /^[\d\s()+-]+$/;

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return PHONE_CHARACTERS.test(phone) && digits.length >= 8 && digits.length <= 15;
}

type ValidationResult<T> = { data: T; error?: undefined } | { error: string };

function validatePhone(value: unknown): ValidationResult<string | null> {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    return { data: null };
  }
  if (typeof value !== 'string' || !isValidPhone(value.trim())) {
    return { error: 'Revisá el WhatsApp: escribí solo números, con el código de área.' };
  }
  return { data: value.trim() };
}

// Al crear, el grupo necesita nombre y al menos una persona; el WhatsApp es opcional.
export function validateGuestGroupInput(body: unknown): ValidationResult<GuestGroupInput> {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del grupo.' };
  }
  const input = body as Record<string, unknown>;

  if (typeof input.name !== 'string' || !input.name.trim()) {
    return { error: 'Escribí el nombre del grupo.' };
  }

  const phone = validatePhone(input.phone);
  if (phone.error !== undefined) {
    return phone;
  }

  if (!Array.isArray(input.guests)) {
    return { error: 'Agregá al menos una persona.' };
  }
  const guests = input.guests
    .filter((guest): guest is string => typeof guest === 'string')
    .map((guest) => guest.trim())
    .filter(Boolean);
  if (guests.length === 0) {
    return { error: 'Agregá al menos una persona.' };
  }
  if (guests.length > MAX_GUESTS_PER_GROUP) {
    return { error: `Un grupo puede tener hasta ${MAX_GUESTS_PER_GROUP} personas.` };
  }

  return { data: { name: input.name.trim(), phone: phone.data, guests } };
}

// Al editar se puede cambiar el nombre y el WhatsApp del grupo.
export function validateGuestGroupUpdate(
  body: unknown,
): ValidationResult<Partial<Omit<GuestGroupInput, 'guests'>>> {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del grupo.' };
  }
  const input = body as Record<string, unknown>;
  const data: Partial<Omit<GuestGroupInput, 'guests'>> = {};

  if (input.name !== undefined) {
    if (typeof input.name !== 'string' || !input.name.trim()) {
      return { error: 'Escribí el nombre del grupo.' };
    }
    data.name = input.name.trim();
  }
  if (input.phone !== undefined) {
    const phone = validatePhone(input.phone);
    if (phone.error !== undefined) {
      return phone;
    }
    data.phone = phone.data;
  }

  return { data };
}
