import { InvitationItem } from '../models/Invitation';

// Link de "Cómo llegar": abre Google Maps (la app, si está instalada) en el lugar del evento.
export function directionsUrl(item: InvitationItem) {
  const params = new URLSearchParams({ api: '1' });
  if (item.placeId && item.latitude !== null && item.longitude !== null) {
    params.set('destination', `${item.latitude},${item.longitude}`);
    params.set('destination_place_id', item.placeId);
  } else {
    params.set('destination', `${item.venueName}, ${item.address}`);
  }
  return `https://www.google.com/maps/dir/?${params}`;
}
