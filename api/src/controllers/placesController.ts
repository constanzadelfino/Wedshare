import { Request, Response } from 'express';

import * as placesService from '../services/placesService';

// Google acepta identificadores de sesión de hasta 36 caracteres.
const SESSION_TOKEN_PATTERN = /^[A-Za-z0-9_-]{8,36}$/;
const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{10,300}$/;

function handlePlacesError(error: unknown, res: Response) {
  if (error instanceof placesService.PlacesError) {
    res.status(error.status).json({ error: error.message });
    return true;
  }
  return false;
}

// GET /places/autocomplete?input=...&sessionToken=...
export async function autocomplete(req: Request, res: Response) {
  const input = typeof req.query.input === 'string' ? req.query.input.trim() : '';
  const sessionToken = typeof req.query.sessionToken === 'string' ? req.query.sessionToken : '';
  if (input.length < 3 || input.length > 120 || !SESSION_TOKEN_PATTERN.test(sessionToken)) {
    res.status(400).json({ error: 'Escribí al menos 3 letras de la dirección.' });
    return;
  }
  try {
    res.json(await placesService.autocomplete(input, sessionToken));
  } catch (error) {
    if (!handlePlacesError(error, res)) {
      throw error;
    }
  }
}

// GET /places/:placeId?sessionToken=...
export async function details(req: Request<{ placeId: string }>, res: Response) {
  const sessionToken = typeof req.query.sessionToken === 'string' ? req.query.sessionToken : '';
  if (!PLACE_ID_PATTERN.test(req.params.placeId) || !SESSION_TOKEN_PATTERN.test(sessionToken)) {
    res.status(400).json({ error: 'No encontramos ese lugar. Volvé a buscarlo.' });
    return;
  }
  try {
    res.json(await placesService.getPlaceDetails(req.params.placeId, sessionToken));
  } catch (error) {
    if (!handlePlacesError(error, res)) {
      throw error;
    }
  }
}
