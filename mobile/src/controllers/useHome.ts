import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { Event } from '../models/Event';
import { GuestGroup } from '../models/Guest';
import { ApiError } from '../services/apiClient';
import { listEvents } from '../services/eventService';
import { listGuestGroups } from '../services/guestService';
import { daysUntil } from '../utils/date';

// Cantidad de personas según su respuesta.
export type GuestCounts = {
  confirmed: number;
  pending: number;
  declined: number;
  total: number;
};

function countGuests(groups: GuestGroup[]): GuestCounts {
  const counts = { confirmed: 0, pending: 0, declined: 0, total: 0 };
  for (const group of groups) {
    for (const guest of group.guests) {
      counts[guest.status] += 1;
      counts.total += 1;
    }
  }
  return counts;
}

// Lógica del Inicio: trae el casamiento del usuario y sus invitados, y calcula la cuenta
// regresiva y las confirmaciones. Se vuelve a cargar cada vez que la pantalla queda visible,
// por ejemplo al volver de Invitados o de Crear evento.
export function useHome() {
  // Cada cuenta tiene un solo casamiento; null si todavía no lo creó.
  const [event, setEvent] = useState<Event | null>(null);
  const [counts, setCounts] = useState<GuestCounts>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      async function load() {
        const [first] = await listEvents();
        // Sin evento no hay invitados: la API respondería 404.
        const groups = first ? await listGuestGroups() : [];
        return { event: first ?? null, counts: countGuests(groups) };
      }
      load()
        .then((result) => {
          if (active) {
            setEvent(result.event);
            setCounts(result.counts);
            setError(undefined);
          }
        })
        .catch((reason) => {
          if (active) {
            setError(
              reason instanceof ApiError
                ? reason.message
                : 'No pudimos cargar tu casamiento. Intentá de nuevo en unos minutos.',
            );
          }
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
      return () => {
        active = false;
      };
    }, []),
  );

  return {
    event,
    counts,
    daysLeft: event ? daysUntil(event.date) : null,
    loading,
    error,
  };
}
