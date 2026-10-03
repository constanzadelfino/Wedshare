import { Router } from 'express';

import { getHealth } from '../controllers/healthController';

// Cada ruta apunta a la función del controlador que la atiende.
export const router = Router();

router.get('/health', getHealth);
