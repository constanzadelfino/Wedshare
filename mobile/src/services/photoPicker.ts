import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

// Ancho máximo de las fotos: alcanza para verse bien en celulares y pesa poco.
const MAX_WIDTH = 1600;

// Abre la galería para elegir una foto, con el recorte indicado (o sin recortar), y la achica
// antes de subirla. Devuelve la dirección del archivo listo, o null si se canceló.
async function pickPhoto(aspect: [number, number] | null) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: aspect !== null,
    ...(aspect ? { aspect } : {}),
    quality: 1,
  });
  if (result.canceled || !result.assets[0]) {
    return null;
  }

  const asset = result.assets[0];
  const context = ImageManipulator.manipulate(asset.uri);
  if (asset.width > MAX_WIDTH) {
    context.resize({ width: MAX_WIDTH });
  }
  const image = await context.renderAsync();
  const saved = await image.saveAsync({ compress: 0.8, format: SaveFormat.JPEG });
  return saved.uri;
}

// Foto de portada, con recorte vertical (3:4, como en el diseño).
export function pickCoverPhoto() {
  return pickPhoto([3, 4]);
}

// Foto de Nuestra historia, con el recorte del arco del diseño (4:5).
export function pickStoryPhoto() {
  return pickPhoto([4, 5]);
}

// Foto del álbum, sin recortar: la grilla de la invitación la acomoda.
export function pickAlbumPhoto() {
  return pickPhoto(null);
}
