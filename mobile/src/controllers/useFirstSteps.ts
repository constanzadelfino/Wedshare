import { router } from 'expo-router';
import { useState } from 'react';

import { ApiError } from '../services/apiClient';
import { createEvent } from '../services/eventService';
import { displayDateToIso, formatDateInput, todayIso } from '../utils/date';

type FieldErrors = {
  names?: string;
  date?: string;
  venue?: string;
};

// Primeros pasos, paso 1: los datos mínimos para que exista la invitación (nombres, fecha y
// lugar). Los nombres sirven de nombre del evento y de nombres de los novios en la invitación.
// Lo demás (Google Calendar, módulos) queda con los valores de siempre y se cambia después.
export function useFirstSteps() {
  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function validate() {
    const errors: FieldErrors = {};
    if (!names.trim()) {
      errors.names = 'Escribí sus nombres.';
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

  async function handleNext() {
    setFormError(undefined);
    const isoDate = validate();
    if (!isoDate) {
      return;
    }
    setLoading(true);
    try {
      await createEvent({
        name: names.trim(),
        coupleNames: names.trim(),
        date: isoDate,
        venue: venue.trim(),
        calendarSync: true,
        playlistEnabled: true,
        giftsEnabled: false,
      });
      router.replace({ pathname: '/plantilla', params: { inicio: '1' } });
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo en unos minutos.');
      setLoading(false);
    }
  }

  return {
    names,
    setNames,
    date,
    setDate: (value: string) => setDate(formatDateInput(value)),
    venue,
    setVenue,
    fieldErrors,
    formError,
    loading,
    handleNext,
  };
}
