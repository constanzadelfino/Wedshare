import { Request, Response } from 'express';

import { isInviteToken } from '../models/invitation';
import * as invitationService from '../services/invitationService';

type TokenParams = { token: string };

// GET /invitations/:token
export async function get(req: Request<TokenParams>, res: Response) {
  const invitation = isInviteToken(req.params.token)
    ? await invitationService.getInvitation(req.params.token)
    : null;
  if (!invitation) {
    res.status(404).json({ error: 'No encontramos esta invitación. Revisá el link que te mandaron.' });
    return;
  }
  res.json(invitation);
}
