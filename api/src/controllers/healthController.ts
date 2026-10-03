import { Request, Response } from 'express';

import { isDatabaseUp } from '../services/healthService';

// GET /health: indica si la API y la base de datos están funcionando.
export async function getHealth(_req: Request, res: Response) {
  const database = await isDatabaseUp();
  res.status(database ? 200 : 503).json({ api: 'ok', database: database ? 'ok' : 'error' });
}
