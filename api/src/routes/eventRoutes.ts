import { Router } from 'express';
import multer from 'multer';

import * as eventController from '../controllers/eventController';
import { requireAuth } from '../middlewares/requireAuth';

// Las fotos llegan como formulario (multipart) y se guardan en memoria hasta subirlas a Storage.
const photoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, accept) => {
    accept(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype));
  },
});

// Rutas de los eventos. Todas piden sesión iniciada.
export const eventRoutes = Router();

eventRoutes.use(requireAuth);

eventRoutes.get('/', eventController.list);
eventRoutes.post('/', eventController.create);
eventRoutes.get('/:id', eventController.show);
eventRoutes.patch('/:id', eventController.update);
eventRoutes.delete('/:id', eventController.remove);
eventRoutes.post('/:id/cover-photos', photoUpload.single('photo'), eventController.addCoverPhoto);
eventRoutes.delete('/:id/cover-photos/:index', eventController.removeCoverPhoto);
