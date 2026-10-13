import { Router } from 'express';

import * as pushTokenController from '../controllers/pushTokenController';
import { requireAuth } from '../middlewares/requireAuth';

// Celulares que reciben avisos. Piden sesión iniciada.
export const pushTokenRoutes = Router();

pushTokenRoutes.use(requireAuth);

pushTokenRoutes.post('/', pushTokenController.save);
pushTokenRoutes.delete('/', pushTokenController.remove);
