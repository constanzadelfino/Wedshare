import { Request, Response } from 'express';

import { isUuid } from '../lib/uuid';
import { EventItemInput, validateEventItemInput } from '../models/eventItem';
import * as eventItemService from '../services/eventItemService';
import { getOwnerEventId } from '../services/eventService';

const NO_EVENT = { error: 'Primero creá tu evento.' };
const NOT_FOUND = { error: 'No encontramos ese evento.' };

type IdParams = { id: string };

// Busca el evento del usuario. Si no tiene, responde 404 y devuelve null.
async function requireEventId(res: Response) {
  const eventId = await getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
  }
  return eventId;
}

// GET /event-items
export async function list(_req: Request, res: Response) {
  const eventId = await requireEventId(res);
  if (eventId) {
    res.json(await eventItemService.listEventItems(eventId));
  }
}

// POST /event-items
export async function create(req: Request, res: Response) {
  const result = validateEventItemInput(req.body, false);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (eventId) {
    // Al crear, la validación ya exige todos los campos obligatorios.
    const item = await eventItemService.createEventItem(eventId, result.data as EventItemInput);
    res.status(201).json(item);
  }
}

// PATCH /event-items/:id
export async function update(req: Request<IdParams>, res: Response) {
  const result = validateEventItemInput(req.body, true);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const item = isUuid(req.params.id)
    ? await eventItemService.updateEventItem(eventId, req.params.id, result.data)
    : null;
  if (!item) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(item);
}

// DELETE /event-items/:id
export async function remove(req: Request<IdParams>, res: Response) {
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const deleted =
    isUuid(req.params.id) && (await eventItemService.deleteEventItem(eventId, req.params.id));
  if (!deleted) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(204).end();
}
