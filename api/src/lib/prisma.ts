import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Falta DATABASE_URL en api/.env');
}

// Única conexión a la base de datos, compartida por todos los servicios.
export const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
