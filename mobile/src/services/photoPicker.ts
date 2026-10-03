import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

// Ancho máximo de las fotos de portada: alcanza para verse bien en celulares y pesa poco.
const MAX_WIDTH = 1600;

// Abre la galería para elegir una foto de portada, con recorte vertical (3:4, como en el diseño),
// y la achica antes de subirla. Devuelve la dirección del archivo listo, o null si se canceló.
export async function pickCoverPhoto() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [3, 4],
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
