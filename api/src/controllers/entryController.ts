import { Request, Response } from 'express';

import { isEntryCode, validateEntryCheckInput } from '../models/entry';
import * as entryService from '../services/entryService';
import { getOwnerEventId } from '../services/eventService';

const NO_EVENT = { error: 'Primero creá tu evento.' };
const NOT_FOUND = { error: 'Este QR no corresponde a ningún invitado de tu casamiento.' };

type CodeParams = { code: string };

// Busca el evento del usuario. Si no tiene, responde 404 y devuelve null.
async function requireEventId(res: Response) {
  const eventId = await getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
  }
  return eventId;
}

// GET /entry-passes/:code: lo que se ve al escanear un QR.
export async function show(req: Request<CodeParams>, res: Response) {
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const pass = isEntryCode(req.params.code)
    ? await entryService.getEntryPass(eventId, req.params.code)
    : null;
  if (!pass) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(pass);
}

// POST /entry-passes/:code/checks: registra el ingreso de las personas elegidas.
export async function registerEntry(req: Request<CodeParams>, res: Response) {
  const result = validateEntryCheckInput(req.body);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const pass = isEntryCode(req.params.code)
    ? await entryService.registerEntry(eventId, req.params.code, result.data)
    : null;
  if (!pass) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(201).json(pass);
}
