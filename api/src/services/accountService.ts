import { prisma } from '../lib/prisma';
import { COVER_PHOTOS_BUCKET, getStorageClient } from '../lib/storage';

// Errores al borrar la cuenta, con el mensaje listo para mostrar.
export class AccountError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

// Borra todo lo de la cuenta: las fotos, el casamiento (con sus invitados, respuestas, regalos
// y eventos, que se borran en cascada) y el usuario de Supabase Auth. El usuario va último:
// si algo falla antes, se puede volver a intentar con la misma sesión.
export async function deleteAccount(ownerId: string) {
  // La clave secreta también permite borrar usuarios de Supabase Auth.
  const supabase = getStorageClient();
  if (!supabase) {
    throw new AccountError(
      'Todavía no se puede eliminar la cuenta (falta SUPABASE_SECRET_KEY en la API).',
      503,
    );
  }

  const event = await prisma.event.findUnique({ where: { ownerId } });
  if (event) {
    const photos = [...event.coverPhotos, ...event.albumPhotos, ...(event.storyPhoto ? [event.storyPhoto] : [])];
    if (photos.length > 0) {
      // Si no se pueden borrar las fotos se sigue igual: sin el casamiento nadie llega a ellas.
      const { error } = await supabase.storage.from(COVER_PHOTOS_BUCKET).remove(photos);
      if (error) {
        console.warn('No se pudieron borrar las fotos de la cuenta', error);
      }
    }
    await prisma.event.delete({ where: { id: event.id } });
  }

  const { error } = await supabase.auth.admin.deleteUser(ownerId);
  if (error && error.status !== 404) {
    throw error;
  }
}
