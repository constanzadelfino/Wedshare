import 'dotenv/config';

import { EventItem } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { isSecretBoxConfigured, open, seal } from '../lib/secretBox';

// Google Calendar de los novios. La app consigue el permiso de Google (con el login de Supabase)
// y le pasa a la API el token; la API lo guarda cifrado y desde acá crea, actualiza y borra en el
// calendario de los novios un evento por cada parte del casamiento (civil, ceremonia, festejo).
// Mientras no hay partes cargadas, crea un solo evento de todo el día con la fecha.
//
// Si Google falla, lo que se guardó en Wedshare queda igual: la sincronización corre aparte y
// solo deja un aviso en la consola. Si el permiso venció (en el modo Prueba de Google dura 7 días),
// se borra el token y la app pide volver a conectar.

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';
const EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
const TIME_ZONE = 'America/Argentina/Buenos_Aires';

const KIND_LABELS = { party: 'Festejo', ceremony: 'Ceremonia', civil: 'Civil' } as const;
// Google pide una hora de fin. Los novios cargan solo la de inicio, así que se usa una duración fija.
const KIND_HOURS = { party: 6, ceremony: 1, civil: 1 } as const;

// Errores al conectar, con el mensaje listo para mostrar.
export class CalendarError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

// El permiso de Google venció o lo sacaron desde la cuenta de Google.
class CalendarExpiredError extends Error {}

function getClientCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  return clientId && clientSecret && isSecretBoxConfigured() ? { clientId, clientSecret } : null;
}

type TokenResponse = { access_token: string; expires_in: number; scope?: string };

// Pide a Google un token de acceso (dura una hora) a partir del token guardado.
async function requestAccessToken(refreshToken: string): Promise<TokenResponse> {
  const credentials = getClientCredentials();
  if (!credentials) {
    throw new CalendarError('Google Calendar todavía no está configurado en la API.', 503);
  }
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!response.ok) {
    const { error } = (await response.json().catch(() => ({}))) as { error?: string };
    // invalid_grant: el token venció o lo revocaron. Cualquier otro error es de configuración.
    if (error === 'invalid_grant') {
      throw new CalendarExpiredError();
    }
    throw new Error(`Google respondió ${response.status} (${error}) al pedir el token`);
  }
  return (await response.json()) as TokenResponse;
}

// Tokens de acceso por evento, para no pedir uno nuevo en cada cambio.
const accessTokens = new Map<string, { token: string; expiresAt: number }>();

async function getAccessToken(eventId: string, sealedRefreshToken: string) {
  const cached = accessTokens.get(eventId);
  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.token;
  }
  const { access_token, expires_in } = await requestAccessToken(open(sealedRefreshToken));
  accessTokens.set(eventId, { token: access_token, expiresAt: Date.now() + expires_in * 1000 });
  return access_token;
}

// Pedido a la API de Google Calendar. Devuelve null si el evento ya no existe en Google.
async function calendarRequest(accessToken: string, method: string, url: string, body?: object) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.status === 404 || response.status === 410) {
    return null;
  }
  if (response.status === 401) {
    throw new CalendarExpiredError();
  }
  if (!response.ok) {
    throw new Error(`Google Calendar respondió ${response.status}: ${await response.text()}`);
  }
  return response.status === 204 ? { id: '' } : ((await response.json()) as { id: string });
}

type EventForCalendar = { name: string; coupleNames: string | null; venue: string; date: Date };

function dateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Suma horas a una fecha y hora de Argentina sin pasar por el huso horario de la computadora.
function addHours(date: string, time: string, hours: number) {
  const end = new Date(new Date(`${date}T${time}:00Z`).getTime() + hours * 3_600_000);
  return end.toISOString().slice(0, 19);
}

const DESCRIPTION = 'Lo agendó Wedshare. Si cambian algo en la app, se actualiza solo.';

function itemBody(event: EventForCalendar, item: EventItem) {
  const date = dateOnly(item.date);
  const place = item.address.startsWith(item.venueName) ? item.address : `${item.venueName}, ${item.address}`;
  return {
    summary: `${KIND_LABELS[item.kind]} · ${event.coupleNames ?? event.name}`,
    location: place,
    description: DESCRIPTION,
    start: { dateTime: `${date}T${item.time}:00`, timeZone: TIME_ZONE },
    end: { dateTime: addHours(date, item.time, KIND_HOURS[item.kind]), timeZone: TIME_ZONE },
    // Si lo habían borrado en Google, vuelve a aparecer.
    status: 'confirmed',
  };
}

function allDayBody(event: EventForCalendar) {
  const next = new Date(event.date.getTime() + 86_400_000);
  return {
    summary: event.coupleNames ? `Casamiento de ${event.coupleNames}` : event.name,
    location: event.venue,
    description: DESCRIPTION,
    start: { date: dateOnly(event.date) },
    end: { date: dateOnly(next) },
    status: 'confirmed',
  };
}

// Crea el evento en Google, o lo actualiza si ya existía. Devuelve su id.
async function upsertGoogleEvent(accessToken: string, googleId: string | null, body: object) {
  if (googleId) {
    const updated = await calendarRequest(accessToken, 'PATCH', `${EVENTS_URL}/${googleId}`, body);
    if (updated) {
      return googleId;
    }
  }
  const created = await calendarRequest(accessToken, 'POST', EVENTS_URL, body);
  return created!.id;
}

async function deleteGoogleEvent(accessToken: string, googleId: string) {
  await calendarRequest(accessToken, 'DELETE', `${EVENTS_URL}/${googleId}`);
}

// Deja el calendario igual que el casamiento en Wedshare.
async function syncNow(eventId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId }, include: { items: true } });
  if (!event?.calendarSync || !event.calendarRefreshToken) {
    return;
  }
  const accessToken = await getAccessToken(event.id, event.calendarRefreshToken);

  for (const item of event.items) {
    const googleId = await upsertGoogleEvent(accessToken, item.googleEventId, itemBody(event, item));
    if (googleId !== item.googleEventId) {
      await prisma.eventItem.update({ where: { id: item.id }, data: { googleEventId: googleId } });
    }
  }

  if (event.items.length === 0) {
    const googleId = await upsertGoogleEvent(accessToken, event.calendarAllDayId, allDayBody(event));
    if (googleId !== event.calendarAllDayId) {
      await prisma.event.update({ where: { id: event.id }, data: { calendarAllDayId: googleId } });
    }
  } else if (event.calendarAllDayId) {
    await deleteGoogleEvent(accessToken, event.calendarAllDayId);
    await prisma.event.update({ where: { id: event.id }, data: { calendarAllDayId: null } });
  }
}

// Si el permiso venció, se borra el token: la app muestra que hay que volver a conectar.
async function forgetExpiredToken(eventId: string) {
  accessTokens.delete(eventId);
  await prisma.event.update({ where: { id: eventId }, data: { calendarRefreshToken: null } });
}

// Los cambios de un mismo casamiento van uno detrás de otro, para no crear eventos repetidos
// si llegan dos pedidos juntos.
const queues = new Map<string, Promise<void>>();

function enqueue(eventId: string, job: () => Promise<void>) {
  const next = (queues.get(eventId) ?? Promise.resolve()).then(job).catch(async (error) => {
    if (error instanceof CalendarExpiredError) {
      await forgetExpiredToken(eventId).catch(() => {});
      return;
    }
    console.warn('No se pudo actualizar Google Calendar', error);
  });
  queues.set(eventId, next);
  void next.finally(() => {
    if (queues.get(eventId) === next) {
      queues.delete(eventId);
    }
  });
  return next;
}

// Actualiza el calendario después de un cambio, sin hacer esperar la respuesta.
export function scheduleCalendarSync(eventId: string) {
  void enqueue(eventId, () => syncNow(eventId));
}

// Borra del calendario el evento de una parte que se acaba de borrar en Wedshare,
// y vuelve a sincronizar (si no quedan partes, aparece el evento de todo el día).
export function scheduleCalendarRemoval(eventId: string, googleEventId: string | null) {
  void enqueue(eventId, async () => {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (googleEventId && event?.calendarSync && event.calendarRefreshToken) {
      await deleteGoogleEvent(await getAccessToken(eventId, event.calendarRefreshToken), googleEventId);
    }
    await syncNow(eventId);
  });
}

// Conecta el Google Calendar de los novios con el token que consiguió la app, y agenda todo.
export async function connectCalendar(eventId: string, refreshToken: string) {
  let token: TokenResponse;
  try {
    token = await requestAccessToken(refreshToken);
  } catch (error) {
    if (error instanceof CalendarExpiredError) {
      throw new CalendarError('No pudimos conectar tu Google Calendar. Probá de nuevo.', 400);
    }
    throw error;
  }
  // En la pantalla de Google se puede destildar el permiso del calendario.
  if (!token.scope?.split(' ').includes(CALENDAR_SCOPE)) {
    throw new CalendarError('Para agendar el casamiento, aceptá el permiso para usar tu calendario.', 400);
  }

  const userInfo = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  const email = userInfo.ok ? (((await userInfo.json()) as { email?: string }).email ?? null) : null;

  accessTokens.set(eventId, { token: token.access_token, expiresAt: Date.now() + token.expires_in * 1000 });
  await prisma.event.update({
    where: { id: eventId },
    data: { calendarSync: true, calendarRefreshToken: seal(refreshToken), calendarEmail: email },
  });
  await enqueue(eventId, () => syncNow(eventId));
}

// Saca del calendario lo que agendó Wedshare, le devuelve el permiso a Google y olvida la cuenta.
// Si algo de Google falla, se desconecta igual.
export async function disconnectCalendar(eventId: string) {
  await enqueue(eventId, async () => {
    const event = await prisma.event.findUnique({ where: { id: eventId }, include: { items: true } });
    if (!event?.calendarRefreshToken) {
      return;
    }
    try {
      const accessToken = await getAccessToken(eventId, event.calendarRefreshToken);
      const googleIds = [event.calendarAllDayId, ...event.items.map((item) => item.googleEventId)];
      for (const googleId of googleIds) {
        if (googleId) {
          await deleteGoogleEvent(accessToken, googleId);
        }
      }
      await fetch('https://oauth2.googleapis.com/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ token: open(event.calendarRefreshToken) }),
      });
    } catch (error) {
      if (!(error instanceof CalendarExpiredError)) {
        console.warn('No se pudo limpiar Google Calendar al desconectar', error);
      }
    }
  });

  accessTokens.delete(eventId);
  await prisma.$transaction([
    prisma.event.update({
      where: { id: eventId },
      data: { calendarSync: false, calendarRefreshToken: null, calendarEmail: null, calendarAllDayId: null },
    }),
    prisma.eventItem.updateMany({ where: { eventId }, data: { googleEventId: null } }),
  ]);
}
