import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { EventItem } from '../models/EventItem';
import { ApiError } from '../services/apiClient';
import { listEventItems } from '../services/eventItemService';

// Trae las partes del casamiento (civil, ceremonia, festejo...). Se vuelve a cargar
// cada vez que la pantalla queda visible, por ejemplo al volver de agregar o editar uno.
export function useEventItems() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      listEventItems()
        .then((result) => {
          if (active) {
            setItems(result);
            setError(undefined);
          }
        })
        .catch((reason) => {
          if (active) {
            setError(
              reason instanceof ApiError ? reason.message : 'No pudimos cargar tus eventos.',
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

  return { items, loading, error };
}
