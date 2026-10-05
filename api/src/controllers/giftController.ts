import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { isUuid } from '../lib/uuid';
import { GiftInput, validateGiftInput } from '../models/gift';
import { getOwnerEventId } from '../services/eventService';
import * as giftService from '../services/giftService';

const NO_EVENT = { error: 'Primero creá tu evento.' };
const NOT_FOUND = { error: 'No encontramos ese regalo.' };

type IdParams = { id: string };

// Un regalo por transferencia necesita la cuenta bancaria cargada (al menos alias o CBU).
// Si falta, responde 400 y devuelve false.
async function checkBankForTransfer(eventId: string, input: Partial<GiftInput>, res: Response) {
  if (input.method !== 'transfer') {
    return true;
  }
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { giftAlias: true, giftCbu: true },
  });
  if (!event?.giftAlias && !event?.giftCbu) {
    res.status(400).json({ error: 'Para regalos por transferencia, cargá el alias o el CBU de la cuenta.' });
    return false;
  }
  return true;
}

// Busca el evento del usuario. Si no tiene, responde 404 y devuelve null.
async function requireEventId(res: Response) {
  const eventId = await getOwnerEventId(res.locals.userId);
  if (!eventId) {
    res.status(404).json(NO_EVENT);
  }
  return eventId;
}

// GET /gifts
export async function list(_req: Request, res: Response) {
  const eventId = await requireEventId(res);
  if (eventId) {
    res.json(await giftService.listGifts(eventId));
  }
}

// POST /gifts
export async function create(req: Request, res: Response) {
  const result = validateGiftInput(req.body, false);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (eventId && (await checkBankForTransfer(eventId, result.data, res))) {
    // Al crear, la validación ya exige nombre, forma de regalar y link.
    const input = { type: 'other', price: null, given: false, ...result.data } as GiftInput;
    res.status(201).json(await giftService.createGift(eventId, input));
  }
}

// PATCH /gifts/:id
export async function update(req: Request<IdParams>, res: Response) {
  const result = validateGiftInput(req.body, true);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  const eventId = await requireEventId(res);
  if (!eventId || !(await checkBankForTransfer(eventId, result.data, res))) {
    return;
  }
  const gift = isUuid(req.params.id)
    ? await giftService.updateGift(eventId, req.params.id, result.data)
    : null;
  if (!gift) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(gift);
}

// DELETE /gifts/:id
export async function remove(req: Request<IdParams>, res: Response) {
  const eventId = await requireEventId(res);
  if (!eventId) {
    return;
  }
  const deleted = isUuid(req.params.id) && (await giftService.deleteGift(eventId, req.params.id));
  if (!deleted) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(204).end();
}
