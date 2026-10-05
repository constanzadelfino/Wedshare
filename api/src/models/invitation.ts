import { EventItemKind } from './eventItem';
import { GiftData } from './gift';
import { GuestStatus } from './guest';

// Lo que ve un invitado al abrir su link. Es público para quien tenga el token,
// así que solo lleva lo que se muestra en la invitación: nada del dueño ni de otros grupos.
export type InvitationData = {
  // true en la vista previa de los novios: la familia es de ejemplo y no se puede confirmar.
  preview: boolean;
  group: {
    name: string;
    guests: { id: string; name: string; status: GuestStatus; dietary: string | null }[];
    // La respuesta del grupo, si ya respondió.
    rsvp: { message: string | null } | null;
    // Lo que lleva el QR de ingreso. Solo viene si alguien del grupo confirmó.
    entryCode: string | null;
  };
  event: {
    // Nombre del evento. Se muestra si los novios no cargaron sus nombres.
    name: string;
    coupleNames: string | null;
    // Formato AAAA-MM-DD.
    date: string;
    venue: string;
    welcomeMessage: string | null;
    // Direcciones públicas de las fotos de portada, en orden.
    coverPhotoUrls: string[];
    coverWithoutPhotos: boolean;
    // Formato AAAA-MM-DD.
    rsvpDeadline: string | null;
    // true si ya pasó la fecha límite: no se puede confirmar ni cambiar la respuesta.
    rsvpClosed: boolean;
    dressCode: string | null;
    // Civil, ceremonia, festejo u otros, en orden cronológico.
    items: {
      id: string;
      // party (festejo), ceremony (ceremonia) o civil. La web pone el nombre y el ícono.
      kind: EventItemKind;
      date: string;
      // Formato HH:MM, en horario de Argentina.
      time: string;
      venueName: string;
      address: string;
      placeId: string | null;
      latitude: number | null;
      longitude: number | null;
    }[];
    // Sección Regalos. null si los novios la apagaron o no cargaron nada.
    gifts: {
      // null si no cargaron ningún dato de la cuenta.
      bank: { bank: string | null; holder: string | null; alias: string | null; cbu: string | null } | null;
      mailbox: boolean;
      ideas: Omit<GiftData, 'id'>[];
    } | null;
  };
};

// Los tokens se generan con 16 bytes al azar en base64url: 22 caracteres.
const INVITE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22}$/;

export function isInviteToken(value: string) {
  return INVITE_TOKEN_PATTERN.test(value);
}

// La confirmación cierra al terminar el día límite, en horario de Argentina.
export function isRsvpClosed(deadline: string | null, now = new Date()) {
  return deadline !== null && now > new Date(`${deadline}T23:59:59-03:00`);
}

// Lo que manda el invitado al confirmar o cambiar su respuesta: cada persona del grupo,
// si asiste y su preferencia alimentaria, y un mensaje opcional para los novios.
export type RsvpInput = {
  guests: { id: string; attending: boolean; dietary: string | null }[];
  message: string | null;
};

const MAX_DIETARY = 120;
const MAX_MESSAGE = 600;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ValidationResult = { data: RsvpInput; error?: undefined } | { error: string };

function optionalText(value: unknown) {
  return typeof value === 'string' ? value.trim() || null : null;
}

export function validateRsvpInput(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos de la confirmación.' };
  }
  const input = body as Record<string, unknown>;
  if (!Array.isArray(input.guests) || input.guests.length === 0) {
    return { error: 'Faltan las personas de la invitación.' };
  }

  const guests: RsvpInput['guests'] = [];
  for (const guest of input.guests) {
    if (typeof guest !== 'object' || guest === null) {
      return { error: 'Los datos de las personas no son válidos.' };
    }
    const { id, attending, dietary } = guest as Record<string, unknown>;
    if (typeof id !== 'string' || !UUID_PATTERN.test(id) || typeof attending !== 'boolean') {
      return { error: 'Los datos de las personas no son válidos.' };
    }
    if (dietary !== undefined && dietary !== null && typeof dietary !== 'string') {
      return { error: 'La preferencia alimentaria tiene que ser un texto.' };
    }
    const text = attending ? optionalText(dietary) : null;
    if (text && text.length > MAX_DIETARY) {
      return { error: `La preferencia alimentaria puede tener hasta ${MAX_DIETARY} caracteres.` };
    }
    guests.push({ id, attending, dietary: text });
  }

  if (input.message !== undefined && input.message !== null && typeof input.message !== 'string') {
    return { error: 'El mensaje tiene que ser un texto.' };
  }
  const message = optionalText(input.message);
  if (message && message.length > MAX_MESSAGE) {
    return { error: `El mensaje puede tener hasta ${MAX_MESSAGE} caracteres.` };
  }

  return { data: { guests, message } };
}
