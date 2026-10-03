import { useState } from 'react';

import { ApiError } from '../services/apiClient';
import { createEvent } from '../services/eventService';
import { displayDateToIso, formatDateInput, todayIso } from '../utils/date';

type FieldErrors = {
  name?: string;
  date?: string;
  venue?: string;
};

// Lógica de la pantalla Crear evento: datos del formulario, validación y envío.
// onCreated se llama cuando el evento quedó guardado.
export function useCreateEvent(onCreated: () => void) {
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
    } else if (isoDate < todayIso()) {
      errors.date = 'La fecha ya pasó. Elegí una fecha futura.';
    }
    if (!venue.trim()) {
      errors.venue = 'Escribí el salón o la dirección.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0 ? isoDate : null;
  }

  async function handleCreate() {
    setFormError(undefined);
    const isoDate = validate();
    if (!isoDate) {
      return;
    }

    setLoading(true);
    try {
      await createEvent({
        name: name.trim(),
        date: isoDate,
        venue: venue.trim(),
        calendarSync,
        playlistEnabled,
        giftsEnabled,
      });
      onCreated();
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo en unos minutos.',
      );
      setLoading(false);
    }
  }

  return {
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
    handleCreate,
  };
}
