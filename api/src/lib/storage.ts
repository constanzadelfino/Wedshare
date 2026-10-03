import 'dotenv/config';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Carpeta de Supabase Storage donde van las fotos de portada. Es pública para que
// la web del invitado pueda mostrarlas; los nombres de archivo son al azar.
export const COVER_PHOTOS_BUCKET = 'cover-photos';

let client: SupabaseClient | null = null;

// Cliente de Supabase con la clave secreta. Solo lo usa la API, nunca la app.
export function getStorageClient() {
  if (client) {
    return client;
  }
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    return null;
  }
  client = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

let bucketReady = false;

// Crea la carpeta de fotos la primera vez que hace falta.
export async function ensureCoverPhotosBucket(storage: SupabaseClient) {
  if (bucketReady) {
    return;
  }
  const { data } = await storage.storage.getBucket(COVER_PHOTOS_BUCKET);
  if (!data) {
    const { error } = await storage.storage.createBucket(COVER_PHOTOS_BUCKET, {
      public: true,
      fileSizeLimit: '5MB',
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });
    if (error && !/already exists/i.test(error.message)) {
      throw error;
    }
  }
  bucketReady = true;
}

export function publicPhotoUrl(storage: SupabaseClient, path: string) {
  return storage.storage.from(COVER_PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl;
}
