import { isUuid } from '../lib/uuid';

// Datos del escaneo en la entrada tal como los manda y los recibe la app.

// Una persona confirmada del grupo. enteredAt es la hora en que ingresó, o null si todavía no.
export type EntryGuestData = {
  id: string;
  name: string;
  enteredAt: string | null;
};

// Lo que ve la persona de la puerta al escanear un QR. guests son solo las personas
// confirmadas: el pase vale para ellas. Si está vacío, nadie del grupo confirmó.
export type EntryPassData = {
  groupName: string;
  guests: EntryGuestData[];
};

// El código del QR se genera igual que el link: 16 bytes al azar en base64url, 22 caracteres.
const ENTRY_CODE_PATTERN = /^[A-Za-z0-9_-]{22}$/;

export function isEntryCode(value: string) {
  return ENTRY_CODE_PATTERN.test(value);
}

type ValidationResult = { data: string[]; error?: undefined } | { error: string };

// Al registrar el ingreso llegan los ids de las personas que entran en ese momento.
export function validateEntryCheckInput(body: unknown): ValidationResult {
  const guestIds = (body as Record<string, unknown> | null)?.guestIds;
  if (!Array.isArray(guestIds) || guestIds.length === 0) {
    return { error: 'Elegí quién ingresa.' };
  }
  if (!guestIds.every((id) => typeof id === 'string' && isUuid(id))) {
    return { error: 'Los datos de las personas no son válidos.' };
  }
  return { data: [...new Set(guestIds as string[])] };
}
