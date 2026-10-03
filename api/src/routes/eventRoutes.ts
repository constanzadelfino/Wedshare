import { Router } from 'express';

import * as eventController from '../controllers/eventController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas de los eventos. Todas piden sesión iniciada.
export const eventRoutes = Router();

eventRoutes.use(requireAuth);

eventRoutes.get('/', eventController.list);
eventRoutes.post('/', eventController.create);
eventRoutes.get('/:id', eventController.show);
eventRoutes.patch('/:id', eventController.update);
eventRoutes.delete('/:id', eventController.remove);
