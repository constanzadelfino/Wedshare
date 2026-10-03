import { Router } from 'express';

import * as guestGroupController from '../controllers/guestGroupController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas de los grupos de invitados del evento del usuario. Todas piden sesión iniciada.
export const guestGroupRoutes = Router();

guestGroupRoutes.use(requireAuth);

guestGroupRoutes.get('/', guestGroupController.list);
guestGroupRoutes.post('/', guestGroupController.create);
guestGroupRoutes.patch('/:id', guestGroupController.update);
guestGroupRoutes.delete('/:id', guestGroupController.remove);
