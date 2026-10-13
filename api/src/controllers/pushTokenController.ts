import { Request, Response } from 'express';

import * as pushService from '../services/pushService';

const INVALID = { error: 'El celular no mandó un token de avisos válido.' };

// POST /push-tokens ({ token }): este celular empieza a recibir los avisos de la cuenta.
export async function save(req: Request, res: Response) {
  const token: unknown = req.body?.token;
  if (!pushService.isPushToken(token)) {
    res.status(400).json(INVALID);
    return;
  }
  await pushService.savePushToken(res.locals.userId, token);
  res.status(204).end();
}

// DELETE /push-tokens ({ token }): este celular deja de recibirlos (al cerrar sesión o apagarlos).
export async function remove(req: Request, res: Response) {
  const token: unknown = req.body?.token;
  if (!pushService.isPushToken(token)) {
    res.status(400).json(INVALID);
    return;
  }
  await pushService.deletePushToken(res.locals.userId, token);
  res.status(204).end();
}
