import { useEffect, useRef, useState } from 'react';

import { EVENT_ITEM_KINDS, EventItemKind } from '../models/EventItem';
import { PlaceSuggestion } from '../models/Place';
import { ApiError } from '../services/apiClient';
import { createEventItem, deleteEventItem, listEventItems, updateEventItem } from '../services/eventItemService';
import { getMyEvent } from '../services/eventService';
import { getPlaceDetails, newPlacesSessionToken, searchPlaces } from '../services/placesService';
import {
  displayDateToIso,
  formatDateInput,
  formatTimeInput,
  isoDateToDisplay,
  isValidTime,
} from '../utils/date';

// Espera entre que se deja de escribir la dirección y se buscan sugerencias.
const SEARCH_DELAY_MS = 350;

type FieldErrors = {
  kind?: string;
  date?: string;
  time?: string;
  venueName?: string;
  address?: string;
};

type Place = { placeId: string; latitude: number; longitude: number };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica del formulario de un evento (festejo, ceremonia o civil). Si recibe itemId, edita;
// si no, crea uno nuevo. Hay como máximo uno de cada tipo.
// La dirección se autocompleta con Google Maps a través de la API.
export function useEventItemForm(itemId: string | undefined, onDone: () => void) {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [kind, setKind] = useState<EventItemKind | null>(null);
  // Tipos que ya usan otros eventos del casamiento: no se pueden elegir.
  const [usedKinds, setUsedKinds] = useState<EventItemKind[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState<Place | null>(null);

  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  // Si la búsqueda no está configurada en la API, se deja de intentar y se escribe a mano.
  const [placesUnavailable, setPlacesUnavailable] = useState(false);
  const sessionToken = useRef(newPlacesSessionToken());
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Carga los eventos para saber qué tipos están usados. Al editar, también el evento;
  // al crear, propone la fecha del casamiento y el primer tipo libre.
  useEffect(() => {
    Promise.all([listEventItems(), getMyEvent()])
      .then(([items, event]) => {
        const others = items.filter((candidate) => candidate.id !== itemId);
        const used = others.map((candidate) => candidate.kind);
        setUsedKinds(used);
        if (!itemId) {
          setKind(EVENT_ITEM_KINDS.find((option) => !used.includes(option.value))?.value ?? null);
          if (event) {
            setDate(isoDateToDisplay(event.date));
          }
          return;
        }
        const item = items.find((candidate) => candidate.id === itemId);
        if (!item) {
          throw new ApiError('No encontramos ese evento.', 404);
        }
        setKind(item.kind);
        setDate(isoDateToDisplay(item.date));
        setTime(item.time);
        setVenueName(item.venueName);
        setAddress(item.address);
        if (item.placeId && item.latitude !== null && item.longitude !== null) {
          setPlace({ placeId: item.placeId, latitude: item.latitude, longitude: item.longitude });
        }
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar el evento.')))
      .finally(() => setLoading(false));
  }, [itemId]);

  useEffect(() => () => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
  }, []);

  // Al escribir la dirección a mano se pierde el lugar elegido y se buscan sugerencias nuevas.
  function changeAddress(value: string) {
    setAddress(value);
    setPlace(null);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    if (placesUnavailable || value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        setSuggestions(await searchPlaces(value.trim(), sessionToken.current));
      } catch (error) {
        setSuggestions([]);
        if (error instanceof ApiError && error.status === 503) {
          setPlacesUnavailable(true);
        }
      } finally {
        setSearching(false);
      }
    }, SEARCH_DELAY_MS);
  }

  async function selectSuggestion(suggestion: PlaceSuggestion) {
    setSuggestions([]);
    try {
      const details = await getPlaceDetails(suggestion.placeId, sessionToken.current);
      setAddress(details.address);
      setPlace({ placeId: details.placeId, latitude: details.latitude, longitude: details.longitude });
      // Si todavía no escribió el nombre del lugar, se completa con el de Google.
      setVenueName((current) => current || details.name);
    } catch {
      // Si falla, queda el texto de la sugerencia como dirección escrita a mano.
      setAddress([suggestion.mainText, suggestion.secondaryText].filter(Boolean).join(', '));
    }
    // La próxima búsqueda es una sesión nueva para Google.
    sessionToken.current = newPlacesSessionToken();
  }

  // Revisa los campos. Devuelve true si están bien.
  function validate() {
    const errors: FieldErrors = {};
    if (!kind) {
      errors.kind = 'Elegí si es el festejo, la ceremonia o el civil.';
    }
    if (!displayDateToIso(date)) {
      errors.date = date ? 'Revisá la fecha: tiene que ser DD/MM/AAAA.' : 'Escribí la fecha.';
    }
    if (!isValidTime(time)) {
      errors.time = time ? 'Revisá la hora: tiene que ser HH:MM.' : 'Escribí la hora.';
    }
    if (!venueName.trim()) {
      errors.venueName = 'Escribí el nombre del lugar.';
    }
    if (!address.trim()) {
      errors.address = 'Escribí la dirección.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    setFormError(undefined);
    const isoDate = displayDateToIso(date);
    if (!validate() || !isoDate || !kind) {
      return;
    }
    setSaving(true);
    const data = {
      kind,
      date: isoDate,
      time,
      venueName: venueName.trim(),
      address: address.trim(),
      placeId: place?.placeId ?? null,
      latitude: place?.latitude ?? null,
      longitude: place?.longitude ?? null,
    };
    try {
      if (itemId) {
        await updateEventItem(itemId, data);
      } else {
        await createEventItem(data);
      }
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos guardar el evento. Intentá de nuevo.'));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!itemId) {
      return;
    }
    setFormError(undefined);
    setDeleting(true);
    try {
      await deleteEventItem(itemId);
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos borrar el evento. Intentá de nuevo.'));
      setDeleting(false);
    }
  }

  return {
    isEditing: !!itemId,
    loading,
    loadError,
    kind,
    setKind,
    usedKinds,
    // Ya están los tres: no se puede agregar otro.
    allKindsUsed: !itemId && usedKinds.length >= EVENT_ITEM_KINDS.length,
    date,
    setDate: (value: string) => setDate(formatDateInput(value)),
    time,
    setTime: (value: string) => setTime(formatTimeInput(value)),
    venueName,
    setVenueName,
    address,
    setAddress: changeAddress,
    hasMapLocation: !!place,
    suggestions,
    searching,
    placesUnavailable,
    selectSuggestion,
    fieldErrors,
    formError,
    saving,
    deleting,
    handleSave,
    handleDelete,
  };
}
