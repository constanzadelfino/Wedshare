import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import { router } from './routes';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(router);

// Cualquier ruta que no exista.
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Esta ruta no existe.' });
});

// Errores inesperados: se muestran en la consola y la app recibe un mensaje genérico.
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Algo salió mal. Intentá de nuevo en unos minutos.' });
});

// Escucha en todas las interfaces para que el celular con Expo Go la alcance por Wi-Fi.
app.listen(port, '0.0.0.0', () => {
  console.log(`API de Wedshare en http://localhost:${port}`);
});
