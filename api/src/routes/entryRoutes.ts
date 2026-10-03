import { Router } from 'express';

import * as entryController from '../controllers/entryController';
import { requireAuth } from '../middlewares/requireAuth';

// Rutas del escaneo en la entrada. Piden sesión: solo los novios validan los QR de su casamiento.
export const entryRoutes = Router();

entryRoutes.use(requireAuth);

entryRoutes.get('/:code', entryController.show);
entryRoutes.post('/:code/checks', entryController.registerEntry);
