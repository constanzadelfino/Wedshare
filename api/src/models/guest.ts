// Datos de los invitados tal como los manda y los recibe la app.
// Las tablas están definidas en prisma/schema.prisma.

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type GuestData = {
  id: string;
  name: string;
  status: GuestStatus;
  // Preferencia alimentaria que anotó al confirmar.
  dietary: string | null;
};

export type GuestGroupData = {
  id: string;
  name: string;
  phone: string | null;
  // Va en el link de la invitación del grupo.
  inviteToken: string;
  guests: GuestData[];
  // Mensaje que dejó el grupo para los novios al confirmar.
  message: string | null;
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

// Al editar, la lista de personas reemplaza a la anterior: las que traen id se conservan
// (con su respuesta) y se renombran, las nuevas se agregan y las que faltan se quitan.
export type GuestGroupUpdate = Partial<Omit<GuestGroupInput, 'guests'>> & {
  guests?: { id?: string; name: string }[];
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Al editar se puede cambiar el nombre, el WhatsApp y las personas del grupo.
export function validateGuestGroupUpdate(body: unknown): ValidationResult<GuestGroupUpdate> {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del grupo.' };
  }
  const input = body as Record<string, unknown>;
  const data: GuestGroupUpdate = {};

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
  if (input.guests !== undefined) {
    if (!Array.isArray(input.guests)) {
      return { error: 'Agregá al menos una persona.' };
    }
    const guests: { id?: string; name: string }[] = [];
    for (const guest of input.guests) {
      if (typeof guest !== 'object' || guest === null) {
        return { error: 'Los datos de las personas no son válidos.' };
      }
      const { id, name } = guest as Record<string, unknown>;
      if (typeof name !== 'string' || !name.trim()) {
        continue;
      }
      if (id !== undefined && (typeof id !== 'string' || !UUID_PATTERN.test(id))) {
        return { error: 'Los datos de las personas no son válidos.' };
      }
      guests.push({ ...(id ? { id } : {}), name: name.trim() });
    }
    if (guests.length === 0) {
      return { error: 'Agregá al menos una persona.' };
    }
    if (guests.length > MAX_GUESTS_PER_GROUP) {
      return { error: `Un grupo puede tener hasta ${MAX_GUESTS_PER_GROUP} personas.` };
    }
    data.guests = guests;
  }

  return { data };
}
