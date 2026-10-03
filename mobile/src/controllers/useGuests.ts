import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { GuestGroup, GuestStatus } from '../models/Guest';
import { ApiError } from '../services/apiClient';
import { listGuestGroups } from '../services/guestService';
import { normalizeForSearch } from '../utils/validation';

export type GuestFilter = 'all' | GuestStatus;

// Lógica de la pantalla Invitados: carga los grupos, y aplica la búsqueda y el filtro por estado.
// Se vuelve a cargar cada vez que la pantalla queda visible, por ejemplo al volver de Agregar invitados.
export function useGuests() {
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  // true si el usuario todavía no creó su evento.
  const [noEvent, setNoEvent] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<GuestFilter>('all');

  useFocusEffect(
    useCallback(() => {
      let active = true;
      listGuestGroups()
        .then((result) => {
          if (active) {
            setGroups(result);
            setNoEvent(false);
            setError(undefined);
          }
        })
        .catch((reason) => {
          if (!active) {
            return;
          }
          if (reason instanceof ApiError && reason.status === 404) {
            setNoEvent(true);
            setError(undefined);
          } else {
            setError(
              reason instanceof ApiError
                ? reason.message
                : 'No pudimos cargar tus invitados. Intentá de nuevo en unos minutos.',
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

  // Grupos que coinciden con la búsqueda y el filtro. Si el nombre del grupo coincide,
  // se muestran todas sus personas; si no, solo las que coinciden.
  const visibleGroups = useMemo(() => {
    const query = normalizeForSearch(search);
    return groups
      .map((group) => {
        const groupMatches = !query || normalizeForSearch(group.name).includes(query);
        const guests = group.guests.filter(
          (guest) =>
            (filter === 'all' || guest.status === filter) &&
            (groupMatches || normalizeForSearch(guest.name).includes(query)),
        );
        return { ...group, visibleGuests: guests };
      })
      .filter((group) => group.visibleGuests.length > 0);
  }, [groups, search, filter]);

  return {
    groups,
    visibleGroups,
    loading,
    error,
    noEvent,
    search,
    setSearch,
    filter,
    setFilter,
  };
}
