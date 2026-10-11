import { Request, Response } from 'express';

import * as accountService from '../services/accountService';

// DELETE /account: borra la cuenta del usuario y todo su casamiento.
export async function remove(_req: Request, res: Response) {
  try {
    await accountService.deleteAccount(res.locals.userId);
  } catch (error) {
    if (error instanceof accountService.AccountError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    throw error;
  }
  res.status(204).end();
}
