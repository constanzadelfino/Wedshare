import { prisma } from '../lib/prisma';

// Hace una consulta mínima para comprobar que la base de datos responde.
export async function isDatabaseUp() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
