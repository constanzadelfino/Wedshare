import { Request, Response } from 'express';

import { isInviteToken, validateRsvpInput } from '../models/invitation';
import * as invitationService from '../services/invitationService';

type TokenParams = { token: string };

const NOT_FOUND = { error: 'No encontramos esta invitación. Revisá el link que te mandaron.' };

// GET /invitations/:token
export async function get(req: Request<TokenParams>, res: Response) {
  const invitation = isInviteToken(req.params.token)
    ? await invitationService.getInvitation(req.params.token)
    : null;
  if (!invitation) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(invitation);
}

// GET /invitations/preview/:token (vista previa de los novios)
export async function getPreview(req: Request<TokenParams>, res: Response) {
  const invitation = isInviteToken(req.params.token)
    ? await invitationService.getPreview(req.params.token)
    : null;
  if (!invitation) {
    res.status(404).json({ error: 'No encontramos esta vista previa. Abrila de nuevo desde la app.' });
    return;
  }
  res.json(invitation);
}

async function saveRsvp(req: Request<TokenParams>, res: Response, mode: 'create' | 'update') {
  if (!isInviteToken(req.params.token)) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  const result = validateRsvpInput(req.body);
  if (result.error !== undefined) {
    res.status(400).json({ error: result.error });
    return;
  }
  try {
    const invitation = await invitationService.saveRsvp(req.params.token, result.data, mode);
    res.status(mode === 'create' ? 201 : 200).json(invitation);
  } catch (error) {
    if (error instanceof invitationService.RsvpError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    throw error;
  }
}

// POST /invitations/:token/rsvp: primera confirmación del grupo.
export function createRsvp(req: Request<TokenParams>, res: Response) {
  return saveRsvp(req, res, 'create');
}

// PATCH /invitations/:token/rsvp: cambiar la respuesta.
export function updateRsvp(req: Request<TokenParams>, res: Response) {
  return saveRsvp(req, res, 'update');
}
