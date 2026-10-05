import { Router } from 'express';

import * as invitationController from '../controllers/invitationController';

// Rutas de la web del invitado. No piden sesión: el token del link identifica al grupo
// (o al evento, en la vista previa de los novios).
export const invitationRoutes = Router();

// La vista previa va antes que /:token para que "preview" no se tome como un token.
invitationRoutes.get('/preview/:token', invitationController.getPreview);
invitationRoutes.get('/:token', invitationController.get);
invitationRoutes.post('/:token/rsvp', invitationController.createRsvp);
invitationRoutes.patch('/:token/rsvp', invitationController.updateRsvp);
