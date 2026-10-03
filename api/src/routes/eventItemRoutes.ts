import { Router } from 'express';

import * as eventItemController from '../controllers/eventItemController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas de las partes del casamiento (civil, ceremonia, festejo...). Todas piden sesión iniciada.
export const eventItemRoutes = Router();

eventItemRoutes.use(requireAuth);

eventItemRoutes.get('/', eventItemController.list);
eventItemRoutes.post('/', eventItemController.create);
eventItemRoutes.patch('/:id', eventItemController.update);
eventItemRoutes.delete('/:id', eventItemController.remove);
