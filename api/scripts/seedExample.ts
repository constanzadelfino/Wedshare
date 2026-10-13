// Crea (o vuelve a armar) el casamiento de ejemplo de la landing: "Ana y Bruno".
// Lo usa el botón "Ver un ejemplo", que abre su vista previa. Los datos son de ejemplo y no es la
// cuenta de nadie: el dueño es un id fijo que no existe en Supabase Auth, así que nadie lo edita
// desde la app. Uso: npm run seed:example (imprime el link de la vista previa).
import 'dotenv/config';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { prisma } from '../src/lib/prisma';
import { COVER_PHOTOS_BUCKET, ensureCoverPhotosBucket, getStorageClient } from '../src/lib/storage';

const EXAMPLE_OWNER_ID = '00000000-0000-4000-8000-0000000000aa';
const PHOTOS_DIR = join(import.meta.dirname, 'example-photos');

function day(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

async function uploadPhoto(eventId: string, file: string) {
  const storage = getStorageClient();
  if (!storage) {
    throw new Error('Falta SUPABASE_SECRET_KEY en api/.env');
  }
  await ensureCoverPhotosBucket(storage);
  const path = `${eventId}/example/${file}`;
  const { error } = await storage.storage
    .from(COVER_PHOTOS_BUCKET)
    .upload(path, readFileSync(join(PHOTOS_DIR, file)), { contentType: 'image/jpeg', upsert: true });
  if (error) {
    throw error;
  }
  return path;
}

async function main() {
  // Se borra y se vuelve a crear, así queda siempre igual.
  await prisma.event.deleteMany({ where: { ownerId: EXAMPLE_OWNER_ID } });
  const event = await prisma.event.create({
    data: {
      ownerId: EXAMPLE_OWNER_ID,
      name: 'Ana y Bruno',
      coupleNames: 'Ana y Bruno',
      date: day('2027-03-20'),
      venue: 'Salón de ejemplo',
      playlistEnabled: false,
      giftsEnabled: true,
      welcomeMessage:
        'Después de muchos años juntos, decidimos casarnos. Nos encantaría que nos acompañes en este día tan especial para nosotros.',
      rsvpDeadline: day('2027-02-20'),
      dressCode: 'Elegante sport',
      storyTitle: 'Cómo empezó todo',
      storyText:
        'Nos conocimos en la facultad, en una clase a la que ninguno de los dos quería ir. Desde ese día no dejamos de elegirnos.',
      closingPhrase: 'Te esperamos para celebrar juntos.',
      giftAlias: 'ana.bruno.ejemplo',
      giftHolder: 'Ana Ejemplo',
      giftBank: 'Banco de ejemplo',
      giftMailbox: true,
      // Mismo formato que los demás links (22 caracteres).
      previewToken: 'ejemplo-ana-y-bruno-01',
      items: {
        create: [
          {
            kind: 'ceremony',
            date: day('2027-03-20'),
            time: '17:30',
            venueName: 'Capilla de ejemplo',
            address: 'Dirección de ejemplo 123',
          },
          {
            kind: 'party',
            date: day('2027-03-20'),
            time: '20:30',
            venueName: 'Salón de ejemplo',
            address: 'Dirección de ejemplo 456',
          },
        ],
      },
      gifts: {
        create: [
          { name: 'Luna de miel', type: 'honeymoon', method: 'transfer' },
          { name: 'Cena para dos', type: 'experience', method: 'transfer', price: 80000 },
        ],
      },
    },
  });

  const [cover1, cover2, cover3, story, album1, album2] = await Promise.all(
    ['pareja.jpg', 'pareja-atardecer.jpg', 'pareja-campo.jpg', 'novia-damas.jpg', 'ramo.jpg', 'ceremonia.jpg'].map(
      (file) => uploadPhoto(event.id, file),
    ),
  );
  await prisma.event.update({
    where: { id: event.id },
    data: { coverPhotos: [cover1, cover2, cover3], storyPhoto: story, albumPhotos: [album1, album2, cover2, cover3] },
  });

  console.log(`Listo. Vista previa: /invitacion/vista-previa/${event.previewToken}`);
}

main().finally(() => prisma.$disconnect());
