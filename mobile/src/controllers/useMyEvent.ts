import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { getMyEvent } from '../services/eventService';

// Trae el casamiento del usuario (null si todavía no lo creó). Se vuelve a cargar cada vez
// que la pantalla queda visible, por ejemplo al volver de crearlo o editarlo.
export function useMyEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getMyEvent()
        .then((myEvent) => {
          if (active) {
            setEvent(myEvent);
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

  return { event, loading, error };
}
