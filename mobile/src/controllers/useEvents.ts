import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { listEvents } from '../services/eventService';

// Trae los eventos del usuario. Se vuelve a cargar cada vez que la pantalla queda visible,
// por ejemplo al volver de Crear evento.
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      listEvents()
        .then((result) => {
          if (active) {
            setEvents(result);
            setError(undefined);
          }
        })
        .catch((reason) => {
          if (active) {
            setError(
              reason instanceof ApiError
                ? reason.message
                : 'No pudimos cargar tus eventos. Intentá de nuevo en unos minutos.',
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

  return { events, loading, error };
}
