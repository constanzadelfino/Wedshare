import { Router } from 'express';

import { getHealth } from '../controllers/healthController';
import { accountRoutes } from './accountRoutes';
import { calendarRoutes } from './calendarRoutes';
import { entryRoutes } from './entryRoutes';
import { eventItemRoutes } from './eventItemRoutes';
import { eventRoutes } from './eventRoutes';
import { giftRoutes } from './giftRoutes';
import { guestGroupRoutes } from './guestGroupRoutes';
import { invitationRoutes } from './invitationRoutes';
import { placesRoutes } from './placesRoutes';

// Cada ruta apunta a la función del controlador que la atiende.
export const router = Router();

router.get('/health', getHealth);
router.use('/account', accountRoutes);
router.use('/calendar', calendarRoutes);
router.use('/events', eventRoutes);
router.use('/event-items', eventItemRoutes);
router.use('/gifts', giftRoutes);
router.use('/guest-groups', guestGroupRoutes);
router.use('/places', placesRoutes);
router.use('/invitations', invitationRoutes);
router.use('/entry-passes', entryRoutes);
