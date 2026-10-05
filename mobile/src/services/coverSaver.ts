import { Asset, requestPermissionsAsync } from 'expo-media-library';
import { RefObject } from 'react';
import { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

// Tamaño de la imagen guardada. Spotify recomienda portadas cuadradas de al menos 300 × 300.
const COVER_SIZE = 1200;

// Convierte la portada que se ve en pantalla en una imagen y la guarda en las fotos del celular.
// Devuelve false si no dieron permiso para guardar.
export async function saveCoverToPhotos(viewRef: RefObject<View | null>) {
  const permission = await requestPermissionsAsync(true);
  if (!permission.granted) {
    return false;
  }
  const uri = await captureRef(viewRef, {
    format: 'jpg',
    quality: 0.95,
    width: COVER_SIZE,
    height: COVER_SIZE,
  });
  await Asset.create(uri);
  return true;
}
