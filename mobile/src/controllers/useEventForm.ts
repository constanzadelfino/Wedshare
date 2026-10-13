import { useEffect, useState } from 'react';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { connectCalendar, disconnectCalendar, requestCalendarPermission } from '../services/calendarService';
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
  // Google Calendar: el interruptor, y el permiso de Google recién conseguido, que se le pasa
  // a la API al guardar. Si el permiso venció, el interruptor arranca apagado.
  const [calendarOn, setCalendarOn] = useState(false);
  const [calendarToken, setCalendarToken] = useState<string>();
  const [askingCalendar, setAskingCalendar] = useState(false);
  // Valores iniciales de los módulos, como en el diseño.
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
        setCalendarOn(myEvent.calendarStatus === 'connected');
        setPlaylistEnabled(myEvent.playlistEnabled);
        setGiftsEnabled(myEvent.giftsEnabled);
      })
      .catch((error) =>
        setLoadError(error instanceof ApiError ? error.message : 'No pudimos cargar tu casamiento.'),
      )
      .finally(() => setLoadingEvent(false));
  }, [editing]);

  // Al prenderlo, se pide el permiso a Google en ese momento (salvo que ya estuviera conectado).
  async function changeCalendar(value: boolean) {
    if (askingCalendar) {
      return;
    }
    setFormError(undefined);
    if (!value || calendarToken || event?.calendarStatus === 'connected') {
      setCalendarOn(value);
      return;
    }
    setAskingCalendar(true);
    const permission = await requestCalendarPermission();
    setAskingCalendar(false);
    if (permission.error) {
      setFormError(permission.error);
    } else if (permission.refreshToken) {
      setCalendarToken(permission.refreshToken);
      setCalendarOn(true);
    }
  }

  // Texto debajo de "Google Calendar".
  function calendarSubtitle() {
    const status = event?.calendarStatus ?? 'off';
    if (askingCalendar) {
      return 'Abriendo Google…';
    }
    if (calendarOn) {
      if (calendarToken) {
        return 'Al guardar, agendamos los eventos del casamiento en tu calendario';
      }
      return event?.calendarEmail
        ? `Agendado en ${event.calendarEmail}. Si cambiás algo, se actualiza solo`
        : 'Agendado en tu calendario. Si cambiás algo, se actualiza solo';
    }
    if (status === 'connected') {
      return 'Al guardar, sacamos los eventos de tu calendario';
    }
    if (status === 'expired') {
      return 'Se desconectó. Prendelo para volver a conectarlo';
    }
    return 'Agendamos el casamiento en tu calendario y lo actualizamos si cambia algo';
  }

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
        playlistEnabled,
        giftsEnabled,
      };
      const saved = event ? await updateEvent(event.id, data) : await createEvent(data);
      // Si falla lo del calendario, el casamiento ya quedó guardado: el próximo Guardar edita.
      setEvent(saved);

      if (calendarOn && calendarToken) {
        await connectCalendar(calendarToken);
        setCalendarToken(undefined);
      } else if (!calendarOn && saved.calendarStatus !== 'off') {
        await disconnectCalendar();
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
    calendarOn,
    setCalendarOn: changeCalendar,
    calendarSubtitle: calendarSubtitle(),
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
