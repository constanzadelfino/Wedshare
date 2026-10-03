import 'dotenv/config';

import { NextFunction, Request, Response } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';

declare global {
  namespace Express {
    interface Locals {
      // Id del usuario de Supabase que hizo el pedido.
      userId: string;
    }
  }
}

const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error('Falta SUPABASE_URL en api/.env');
}

const issuer = `${supabaseUrl}/auth/v1`;
// Claves públicas con las que Supabase firma las sesiones. jose las descarga y las guarda.
const jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

// Deja pasar solo los pedidos con una sesión válida de Supabase
// ("Authorization: Bearer <token>") y guarda quién es el usuario.
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;

  if (!token) {
    res.status(401).json({ error: 'Tenés que iniciar sesión.' });
    return;
  }

  try {
    const { payload } = await jwtVerify(token, jwks, { issuer, audience: 'authenticated' });
    if (!payload.sub) {
      throw new Error('La sesión no tiene usuario');
    }
    res.locals.userId = payload.sub;
  } catch {
    res.status(401).json({ error: 'Tu sesión venció o no es válida. Volvé a ingresar.' });
    return;
  }

  next();
}
