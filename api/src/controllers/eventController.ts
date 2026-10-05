import { Request, Response } from 'express';

import { isUuid } from '../lib/uuid';
import { EventInput, validateEventInput } from '../models/event';
import * as eventService from '../services/eventService';

const NOT_FOUND = { error: 'No encontramos ese evento.' };

type IdParams = { id: string };
type PhotoParams = { id: string; index: string };

// GET /events
export async function list(_req: Request, res: Response) {
  res.json(await eventService.listEvents(res.locals.userId));
}

// GET /events/:id
export async function show(req: Request<IdParams>, res: Response) {
  const event = isUuid(req.params.id)
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
  const event = await eventService.createEvent(
    res.locals.userId,
    result.data as Pick<EventInput, 'name' | 'date' | 'venue'>,
  );
  res.status(201).json(event);
}

// PATCH /events/:id
export async function update(req: Request<IdParams>, res: Response) {
  const result = validateEventInput(req.body, true);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const current = isUuid(req.params.id)
    ? await eventService.getEvent(res.locals.userId, req.params.id)
    : null;
  if (!current) {
    res.status(404).json(NOT_FOUND);
    return;
  }

  // La fecha límite para confirmar tiene que ser antes del casamiento.
  const date = result.data.date ?? current.date;
  const deadline = result.data.rsvpDeadline !== undefined ? result.data.rsvpDeadline : current.rsvpDeadline;
  if (deadline && deadline > date) {
    res.status(400).json({ error: 'La fecha límite para confirmar tiene que ser antes del casamiento.' });
    return;
  }

  res.json(await eventService.updateEvent(res.locals.userId, req.params.id, result.data));
}

// POST /events/:id/preview: devuelve el token del link de vista previa (lo crea si no existe).
export async function preview(req: Request<IdParams>, res: Response) {
  const token = isUuid(req.params.id)
    ? await eventService.getPreviewToken(res.locals.userId, req.params.id)
    : null;
  if (!token) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json({ token });
}

// DELETE /events/:id
export async function remove(req: Request<IdParams>, res: Response) {
  const deleted =
    isUuid(req.params.id) && (await eventService.deleteEvent(res.locals.userId, req.params.id));
  if (!deleted) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(204).end();
}

// Responde los errores esperables de las fotos con su mensaje; los demás siguen de largo.
function handleCoverPhotoError(error: unknown, res: Response) {
  if (error instanceof eventService.CoverPhotoError) {
    res.status(error.status).json({ error: error.message });
    return true;
  }
  return false;
}

// POST /events/:id/cover-photos (formulario con el archivo en el campo "photo")
export async function addCoverPhoto(req: Request<IdParams>, res: Response) {
  if (!req.file) {
    res.status(400).json({ error: 'Elegí una foto para subir.' });
    return;
  }
  if (!isUuid(req.params.id)) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  try {
    const event = await eventService.addCoverPhoto(
      res.locals.userId,
      req.params.id,
      req.file.buffer,
      req.file.mimetype,
    );
    if (!event) {
      res.status(404).json(NOT_FOUND);
      return;
    }
    res.status(201).json(event);
  } catch (error) {
    if (!handleCoverPhotoError(error, res)) {
      throw error;
    }
  }
}

// DELETE /events/:id/cover-photos/:index
export async function removeCoverPhoto(req: Request<PhotoParams>, res: Response) {
  const index = Number(req.params.index);
  if (!isUuid(req.params.id) || !Number.isInteger(index) || index < 0) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  try {
    const event = await eventService.removeCoverPhoto(res.locals.userId, req.params.id, index);
    if (!event) {
      res.status(404).json(NOT_FOUND);
      return;
    }
    res.json(event);
  } catch (error) {
    if (!handleCoverPhotoError(error, res)) {
      throw error;
    }
  }
}
