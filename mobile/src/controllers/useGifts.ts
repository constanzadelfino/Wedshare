import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { Event } from '../models/Event';
import { Gift } from '../models/Gift';
import { ApiError } from '../services/apiClient';
import { getMyEvent, updateEvent } from '../services/eventService';
import { listGifts } from '../services/giftService';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica de la pantalla Regalos: trae el evento (para los interruptores) y las ideas de regalos.
// Los interruptores se guardan al momento. Se vuelve a cargar cada vez que la pantalla
// queda visible, por ejemplo al volver de agregar un regalo.
export function useGifts() {
  const [event, setEvent] = useState<Event | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [error, setError] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      Promise.all([getMyEvent(), listGifts()])
        .then(([myEvent, myGifts]) => {
          if (!active) {
            return;
          }
          if (!myEvent) {
            throw new ApiError('Primero creá tu evento.', 404);
          }
          setEvent(myEvent);
          setGifts(myGifts);
          setLoadError(undefined);
        })
        .catch((reason) => {
          if (active) {
            setLoadError(errorMessage(reason, 'No pudimos cargar tus regalos. Intentá de nuevo.'));
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

  // Cambia un interruptor al instante y lo vuelve atrás si no se pudo guardar.
  async function toggle(field: 'giftsEnabled' | 'giftMailbox', value: boolean) {
    if (!event) {
      return;
    }
    setError(undefined);
    setEvent({ ...event, [field]: value });
    try {
      setEvent(await updateEvent(event.id, { [field]: value }));
    } catch (reason) {
      setEvent((current) => (current ? { ...current, [field]: !value } : current));
      setError(errorMessage(reason, 'No pudimos guardar el cambio. Intentá de nuevo.'));
    }
  }

  return {
    event,
    gifts,
    loading,
    loadError,
    error,
    setShowGifts: (value: boolean) => toggle('giftsEnabled', value),
    setMailbox: (value: boolean) => toggle('giftMailbox', value),
  };
}
