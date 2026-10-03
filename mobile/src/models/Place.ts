// Sugerencia de Google Maps mientras se escribe una dirección.
export type PlaceSuggestion = {
  placeId: string;
  // Ej: el nombre del salón.
  mainText: string;
  // Ej: la calle y la ciudad.
  secondaryText: string;
};

// Lugar elegido, con su dirección completa y coordenadas.
export type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};
