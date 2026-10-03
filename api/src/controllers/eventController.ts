import { Request, Response } from 'express';

import { EventInput, validateEventInput } from '../models/event';
import * as eventService from '../services/eventService';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NOT_FOUND = { error: 'No encontramos ese evento.' };

type IdParams = { id: string };

// GET /events
export async function list(_req: Request, res: Response) {
  res.json(await eventService.listEvents(res.locals.userId));
}

// GET /events/:id
export async function show(req: Request<IdParams>, res: Response) {
  const event = UUID_PATTERN.test(req.params.id)
    ? await eventService.getEvent(res.locals.userId, req.params.id)
    : null;
  if (!event) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(event);
}

// POST /events
export async function create(req: Request, res: Response) {
  const result = validateEventInput(req.body, false);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  if (await eventService.hasEvent(res.locals.userId)) {
    res.status(409).json({ error: 'Ya creaste tu evento. Cada cuenta tiene un solo casamiento.' });
    return;
  }
  // Al crear, la validación ya exige nombre, fecha y lugar.
  const event = await eventService.createEvent(res.locals.userId, result.data as EventInput);
  res.status(201).json(event);
}

// PATCH /events/:id
export async function update(req: Request<IdParams>, res: Response) {
  const result = validateEventInput(req.body, true);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const event = UUID_PATTERN.test(req.params.id)
    ? await eventService.updateEvent(res.locals.userId, req.params.id, result.data)
    : null;
  if (!event) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(event);
}

// DELETE /events/:id
export async function remove(req: Request<IdParams>, res: Response) {
  const deleted =
    UUID_PATTERN.test(req.params.id) &&
    (await eventService.deleteEvent(res.locals.userId, req.params.id));
  if (!deleted) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(204).end();
}
