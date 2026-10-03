import { Router } from 'express';

import * as placesController from '../controllers/placesController';
import { requireAuth } from '../middlewares/requireAuth';

// Búsqueda de direcciones con Google Maps. Piden sesión para que nadie más use la clave.
export const placesRoutes = Router();

placesRoutes.use(requireAuth);

placesRoutes.get('/autocomplete', placesController.autocomplete);
placesRoutes.get('/:placeId', placesController.details);
