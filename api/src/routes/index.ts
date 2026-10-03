import { Router } from 'express';

import { getHealth } from '../controllers/healthController';
import { eventItemRoutes } from './eventItemRoutes';
import { eventRoutes } from './eventRoutes';
import { guestGroupRoutes } from './guestGroupRoutes';
import { invitationRoutes } from './invitationRoutes';
import { placesRoutes } from './placesRoutes';

// Cada ruta apunta a la función del controlador que la atiende.
export const router = Router();

router.get('/health', getHealth);
router.use('/events', eventRoutes);
router.use('/event-items', eventItemRoutes);
router.use('/guest-groups', guestGroupRoutes);
router.use('/places', placesRoutes);
router.use('/invitations', invitationRoutes);
