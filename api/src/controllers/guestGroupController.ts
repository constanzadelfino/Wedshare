import { Request, Response } from 'express';

import { validateGuestGroupInput, validateGuestGroupUpdate } from '../models/guest';
import * as guestService from '../services/guestService';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NO_EVENT = { error: 'Primero creá tu evento.' };
const NOT_FOUND = { error: 'No encontramos ese grupo.' };

type IdParams = { id: string };

// Busca el evento del usuario. Si no tiene, responde 404 y devuelve null.
async function requireEventId(res: Response) {
  const eventId = await guestService.getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
  }
  return eventId;
}

// GET /guest-groups
export async function list(_req: Request, res: Response) {
  const eventId = await requireEventId(res);
  if (eventId) {
    res.json(await guestService.listGuestGroups(eventId));
  }
}

// POST /guest-groups
export async function create(req: Request, res: Response) {
  const result = validateGuestGroupInput(req.body);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (eventId) {
    res.status(201).json(await guestService.createGuestGroup(eventId, result.data));
  }
}

// PATCH /guest-groups/:id
export async function update(req: Request<IdParams>, res: Response) {
  const result = validateGuestGroupUpdate(req.body);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const group = UUID_PATTERN.test(req.params.id)
    ? await guestService.updateGuestGroup(eventId, req.params.id, result.data)
    : null;
  if (!group) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(group);
}

// DELETE /guest-groups/:id
export async function remove(req: Request<IdParams>, res: Response) {
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const deleted =
    UUID_PATTERN.test(req.params.id) &&
    (await guestService.deleteGuestGroup(eventId, req.params.id));
  if (!deleted) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(204).end();
}
