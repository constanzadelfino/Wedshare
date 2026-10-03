import { PlaceDetails, PlaceSuggestion } from '../models/Place';
import { apiRequest } from './apiClient';

// La búsqueda pasa por la API de Wedshare, que es la que tiene la clave de Google Maps.

export function searchPlaces(input: string, sessionToken: string) {
  const query = new URLSearchParams({ input, sessionToken });
  return apiRequest<PlaceSuggestion[]>('GET', `/places/autocomplete?${query}`);
}

export function getPlaceDetails(placeId: string, sessionToken: string) {
  const query = new URLSearchParams({ sessionToken });
  return apiRequest<PlaceDetails>('GET', `/places/${encodeURIComponent(placeId)}?${query}`);
}

// Identificador al azar que agrupa una búsqueda y su elección (Google lo cobra como una sola).
export function newPlacesSessionToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
