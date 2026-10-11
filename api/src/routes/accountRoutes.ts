import { Router } from 'express';

import * as accountController from '../controllers/accountController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas de la cuenta. Piden sesión iniciada.
export const accountRoutes = Router();

accountRoutes.use(requireAuth);

accountRoutes.delete('/', accountController.remove);
