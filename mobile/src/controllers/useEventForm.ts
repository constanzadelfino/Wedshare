import { useEffect, useState } from 'react';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { createEvent, getMyEvent, updateEvent } from '../services/eventService';
import { displayDateToIso, formatDateInput, isoDateToDisplay, todayIso } from '../utils/date';

type FieldErrors = {
  name?: string;
  date?: string;
  venue?: string;
};

// Lógica de la pantalla Crear evento, que también sirve para editar los datos principales del
// casamiento (editing): formulario, validación y envío. onDone se llama cuando quedó guardado.
export function useEventForm(editing: boolean, onDone: () => void) {
  // Al editar, el evento que se carga; mientras tanto el formulario espera.
  const [event, setEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(editing);
  const [loadError, setLoadError] = useState<string>();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  // Valores iniciales de los interruptores, como en el diseño.
  const [calendarSync, setCalendarSync] = useState(true);
  const [playlistEnabled, setPlaylistEnabled] = useState(true);
  const [giftsEnabled, setGiftsEnabled] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editing) {
      return;
    }
    getMyEvent()
      .then((myEvent) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setName(myEvent.name);
        setDate(isoDateToDisplay(myEvent.date));
        setVenue(myEvent.venue);
        setCalendarSync(myEvent.calendarSync);
        setPlaylistEnabled(myEvent.playlistEnabled);
        setGiftsEnabled(myEvent.giftsEnabled);
      })
      .catch((error) =>
        setLoadError(error instanceof ApiError ? error.message : 'No pudimos cargar tu casamiento.'),
      )
      .finally(() => setLoadingEvent(false));
  }, [editing]);

  function validate() {
    const errors: FieldErrors = {};
    if (!name.trim()) {
      errors.name = 'Escribí el nombre del evento.';
    }
    const isoDate = displayDateToIso(date);
    if (!date) {
      errors.date = 'Escribí la fecha.';
    } else if (!isoDate) {
      errors.date = 'Revisá la fecha: tiene que ser DD/MM/AAAA.';
    } else if (isoDate < todayIso() && isoDate !== event?.date) {
      // Al editar, se puede dejar la fecha que ya tenía aunque haya pasado.
      errors.date = 'La fecha ya pasó. Elegí una fecha futura.';
    }
    if (!venue.trim()) {
      errors.venue = 'Escribí el salón o la dirección.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0 ? isoDate : null;
  }

  async function handleSave() {
    setFormError(undefined);
    const isoDate = validate();
    if (!isoDate) {
      return;
    }

    setLoading(true);
    try {
      const data = {
        name: name.trim(),
        date: isoDate,
        venue: venue.trim(),
        calendarSync,
        playlistEnabled,
        giftsEnabled,
      };
      if (event) {
        await updateEvent(event.id, data);
      } else {
        await createEvent(data);
      }
      onDone();
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo en unos minutos.',
      );
      setLoading(false);
    }
  }

  return {
    loadingEvent,
    loadError,
    name,
    setName,
    date,
    setDate: (value: string) => setDate(formatDateInput(value)),
    venue,
    setVenue,
    calendarSync,
    setCalendarSync,
    playlistEnabled,
    setPlaylistEnabled,
    giftsEnabled,
    setGiftsEnabled,
    fieldErrors,
    formError,
    loading,
    handleSave,
  };
}
