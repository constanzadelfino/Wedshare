import { Router } from 'express';

import { getHealth } from '../controllers/healthController';
import { eventRoutes } from './eventRoutes';
import { guestGroupRoutes } from './guestGroupRoutes';

// Cada ruta apunta a la función del controlador que la atiende.
export const router = Router();

router.get('/health', getHealth);
router.use('/events', eventRoutes);
router.use('/guest-groups', guestGroupRoutes);
