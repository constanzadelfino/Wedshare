import { Router } from 'express';

import * as calendarController from '../controllers/calendarController';
import { requireAuth } from '../middlewares/requireAuth';

// Conexión con el Google Calendar de los novios. Piden sesión iniciada.
export const calendarRoutes = Router();

calendarRoutes.use(requireAuth);

calendarRoutes.post('/connection', calendarController.connect);
calendarRoutes.delete('/connection', calendarController.disconnect);
