import { Router } from 'express';

import * as giftController from '../controllers/giftController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas de las ideas de regalos. Todas piden sesión iniciada.
export const giftRoutes = Router();

giftRoutes.use(requireAuth);

giftRoutes.get('/', giftController.list);
giftRoutes.post('/', giftController.create);
giftRoutes.patch('/:id', giftController.update);
giftRoutes.delete('/:id', giftController.remove);
