import { Request, Response } from 'express';

import * as calendarService from '../services/calendarService';
import { getEvent, getOwnerEventId } from '../services/eventService';

const NO_EVENT = { error: 'Primero creá tu evento.' };

// POST /calendar/connection: conecta el Google Calendar con el token que consiguió la app
// ({ refreshToken }) y agenda el casamiento. Responde el evento actualizado.
export async function connect(req: Request, res: Response) {
  const refreshToken: unknown = req.body?.refreshToken;
  if (typeof refreshToken !== 'string' || !refreshToken.trim() || refreshToken.length > 2000) {
    res.status(400).json({ error: 'Falta el permiso de Google.' });
    return;
  }
  const eventId = await getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
    return;
  }
  try {
    await calendarService.connectCalendar(eventId, refreshToken.trim());
  } catch (error) {
    if (error instanceof calendarService.CalendarError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    throw error;
  }
  res.json(await getEvent(res.locals.userId, eventId));
}

// DELETE /calendar/connection: saca del calendario lo que agendó Wedshare y desconecta la cuenta.
// Responde el evento actualizado.
export async function disconnect(_req: Request, res: Response) {
  const eventId = await getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
    return;
  }
  await calendarService.disconnectCalendar(eventId);
  res.json(await getEvent(res.locals.userId, eventId));
}
