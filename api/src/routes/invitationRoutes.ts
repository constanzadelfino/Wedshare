import { Router } from 'express';

import * as invitationController from '../controllers/invitationController';

// Rutas de la web del invitado. No piden sesión: el token del link identifica al grupo.
export const invitationRoutes = Router();

invitationRoutes.get('/:token', invitationController.get);
