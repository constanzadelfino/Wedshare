import { prisma } from '../lib/prisma';

// Avisos al celular de los novios. La app guarda acá el token que le da Expo y la API le pide
// al servicio de Expo que mande el aviso; Expo se lo pasa a Apple o a Google. Si el envío falla,
// lo que hizo el invitado ya quedó guardado: solo se deja un aviso en la consola.

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
// Así son los tokens de Expo: ExponentPushToken[...] (o ExpoPushToken[...]).
const TOKEN_PATTERN = /^Expo(nent)?PushToken\[[A-Za-z0-9_-]{10,100}\]$/;

export function isPushToken(value: unknown): value is string {
  return typeof value === 'string' && TOKEN_PATTERN.test(value);
}

// Guarda el token del celular. Si el celular estaba con otra cuenta, pasa a esta.
export async function savePushToken(ownerId: string, token: string) {
  await prisma.pushToken.upsert({ where: { token }, create: { ownerId, token }, update: { ownerId } });
}

export async function deletePushToken(ownerId: string, token: string) {
  await prisma.pushToken.deleteMany({ where: { ownerId, token } });
}

type PushMessage = { title: string; body: string; data?: Record<string, string> };

type Ticket = { status: 'ok' | 'error'; details?: { error?: string } };

// Manda el aviso a todos los celulares de la cuenta. Los tokens que Expo ya no reconoce
// (la app se desinstaló o se sacó el permiso) se borran.
async function sendToOwner(ownerId: string, message: PushMessage) {
  const tokens = await prisma.pushToken.findMany({ where: { ownerId }, select: { token: true } });
  if (tokens.length === 0) {
    return;
  }
  const response = await fetch(EXPO_PUSH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(tokens.map(({ token }) => ({ to: token, sound: 'default', ...message }))),
  });
  if (!response.ok) {
    throw new Error(`Expo respondió ${response.status}: ${await response.text()}`);
  }
  const { data } = (await response.json()) as { data: Ticket[] };
  const gone = tokens.filter((_, i) => data[i]?.details?.error === 'DeviceNotRegistered');
  if (gone.length > 0) {
    await prisma.pushToken.deleteMany({ where: { token: { in: gone.map(({ token }) => token) } } });
  }
}

// Avisa sin hacer esperar a quien hizo el pedido.
export function notifyOwner(ownerId: string, message: PushMessage) {
  sendToOwner(ownerId, message).catch((error) => console.warn('No se pudo mandar el aviso', error));
}

type GroupAnswer = {
  groupId: string;
  groupName: string;
  statuses: ('pending' | 'confirmed' | 'declined')[];
  // Si es un grupo de una sola persona, su nombre.
  singleName: string | null;
  changed: boolean;
  newMessage: boolean;
};

// Arma el aviso de "Familia Pérez respondió" con cuántos van.
export function rsvpMessage(answer: GroupAnswer): PushMessage {
  const total = answer.statuses.length;
  const confirmed = answer.statuses.filter((status) => status === 'confirmed').length;
  const declined = answer.statuses.filter((status) => status === 'declined').length;
  const pending = total - confirmed - declined;

  const who = answer.singleName ?? answer.groupName;
  const title = answer.changed ? `${who} cambió su respuesta` : `${who} respondió`;

  let body: string;
  if (answer.singleName) {
    body = confirmed ? 'Confirmó su asistencia.' : 'No va a poder ir.';
  } else if (confirmed > 0) {
    const people = `${confirmed} de ${total} ${total === 1 ? 'persona' : 'personas'}`;
    body = answer.changed ? `Ahora van ${people}.` : `${confirmed === 1 ? 'Confirmó' : 'Confirmaron'} ${people}.`;
  } else if (pending === 0) {
    body = answer.changed ? 'Ahora no van a poder ir.' : 'No van a poder ir.';
  } else {
    body = `${declined} no ${declined === 1 ? 'va' : 'van'} a poder ir y ${pending} todavía no ${pending === 1 ? 'sabe' : 'saben'}.`;
  }
  if (answer.newMessage) {
    body += ' Y les dejaron un mensaje.';
  }

  return { title, body, data: { groupId: answer.groupId } };
}
