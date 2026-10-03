import 'dotenv/config';

import express from 'express';

import { router } from './routes';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(router);

// Escucha en todas las interfaces para que el celular con Expo Go la alcance por Wi-Fi.
app.listen(port, '0.0.0.0', () => {
  console.log(`API de Wedshare en http://localhost:${port}`);
});
