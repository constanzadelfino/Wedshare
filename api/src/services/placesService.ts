import 'dotenv/config';

// Búsqueda de direcciones con Google Maps (Places API, versión nueva).
// La clave queda solo en la API; la app nunca la ve.

const PLACES_URL = 'https://places.googleapis.com/v1';

export type PlaceSuggestion = {
  placeId: string;
  // Ej: "Salón [Nombre]".
  mainText: string;
  // Ej: "Av. [Calle] 1234, Buenos Aires".
  secondaryText: string;
};

export type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export class PlacesError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function requireApiKey() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new PlacesError(
      'La búsqueda de direcciones todavía no está configurada. Escribí la dirección a mano.',
      503,
    );
  }
  return key;
}

async function callGoogle(path: string, init: RequestInit) {
  const response = await fetch(`${PLACES_URL}${path}`, init);
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    // El detalle queda en la consola de la API; la app recibe un mensaje claro.
    console.error('Google Places respondió con error', response.status, json?.error?.message);
    throw new PlacesError(
      'No pudimos buscar la dirección en Google Maps. Escribila a mano o probá de nuevo.',
      502,
    );
  }
  return json;
}

// Sugerencias mientras se escribe. sessionToken agrupa la búsqueda y la elección
// para que Google la cobre como una sola sesión.
export async function autocomplete(input: string, sessionToken: string): Promise<PlaceSuggestion[]> {
  const key = requireApiKey();
  const json = await callGoogle('/places:autocomplete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key },
    body: JSON.stringify({
      input,
      sessionToken,
      languageCode: 'es',
      regionCode: 'ar',
      includedRegionCodes: ['ar'],
    }),
  });

  type Suggestion = {
    placePrediction?: {
      placeId: string;
      text?: { text: string };
      structuredFormat?: { mainText?: { text: string }; secondaryText?: { text: string } };
    };
  };
  return ((json?.suggestions ?? []) as Suggestion[])
    .map((suggestion) => suggestion.placePrediction)
    .filter((prediction) => prediction !== undefined)
    .map((prediction) => ({
      placeId: prediction.placeId,
      mainText: prediction.structuredFormat?.mainText?.text ?? prediction.text?.text ?? '',
      secondaryText: prediction.structuredFormat?.secondaryText?.text ?? '',
    }));
}

// Nombre, dirección completa y coordenadas del lugar elegido.
export async function getPlaceDetails(placeId: string, sessionToken: string): Promise<PlaceDetails> {
  const key = requireApiKey();
  const query = new URLSearchParams({ sessionToken, languageCode: 'es', regionCode: 'ar' });
  const json = await callGoogle(`/places/${encodeURIComponent(placeId)}?${query}`, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,location',
    },
  });
  return {
    placeId: json.id,
    name: json.displayName?.text ?? '',
    address: json.formattedAddress ?? '',
    latitude: json.location?.latitude,
    longitude: json.location?.longitude,
  };
}
