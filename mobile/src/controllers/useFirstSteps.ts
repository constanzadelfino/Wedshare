import { router } from 'expo-router';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { ApiError } from '../services/apiClient';
import { createEvent } from '../services/eventService';
import { hasPostponedFirstSteps, postponeFirstSteps } from '../services/onboardingStorage';
import { displayDateToIso, formatDateInput, todayIso } from '../utils/date';

// Las preguntas de los primeros pasos, una por pantalla, después del saludo.
export const FIRST_STEPS_QUESTIONS = ['names', 'date', 'venue'] as const;
type Question = (typeof FIRST_STEPS_QUESTIONS)[number];

// Primeros pasos (onboarding después del registro): un saludo y tres preguntas, una por pantalla
// (nombres, fecha y lugar). Con eso se crea el casamiento y sigue con Elegí una plantilla.
// Los nombres sirven de nombre del evento y de nombres de los novios en la invitación; lo demás
// (Google Calendar, módulos) queda con los valores de siempre y se cambia después.
export function useFirstSteps() {
  const { user } = useAuth();
  // 0 es el saludo; 1 a 3, las preguntas.
  const [step, setStep] = useState(0);
  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [fieldError, setFieldError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const question: Question | null = step === 0 ? null : FIRST_STEPS_QUESTIONS[step - 1];
  const firstName = user?.name?.trim().split(/\s+/)[0];

  // Revisa la respuesta de la pregunta actual; devuelve el mensaje de error, si hay.
  function check(current: Question) {
    if (current === 'names') {
      return names.trim() ? undefined : 'Escribí sus nombres.';
    }
    if (current === 'date') {
      const isoDate = displayDateToIso(date);
      if (!date) {
        return 'Escribí la fecha.';
      }
      if (!isoDate) {
        return 'Revisá la fecha: tiene que ser DD/MM/AAAA.';
      }
      return isoDate < todayIso() ? 'La fecha ya pasó. Elegí una fecha futura.' : undefined;
    }
    return venue.trim() ? undefined : 'Escribí el salón o la dirección.';
  }

  async function next() {
    setFormError(undefined);
    if (!question) {
      setStep(1);
      return;
    }
    const error = check(question);
    setFieldError(error);
    if (error) {
      return;
    }
    if (step < FIRST_STEPS_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }
    await create();
  }

  function back() {
    setFieldError(undefined);
    setFormError(undefined);
    setStep(Math.max(0, step - 1));
  }

  async function create() {
    const isoDate = displayDateToIso(date);
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

  // "Más tarde": el Inicio muestra una tarjeta para retomar, en lugar de traerlos acá.
  function later() {
    if (user) {
      postponeFirstSteps(user.id);
    }
    router.replace('/');
  }

  return {
    step,
    question,
    firstName,
    names,
    setNames,
    date,
    setDate: (value: string) => setDate(formatDateInput(value)),
    venue,
    setVenue,
    fieldError,
    formError,
    loading,
    next,
    back,
    later,
  };
}

// Si el Inicio tiene que llevar a los primeros pasos cuando todavía no hay casamiento.
export function useShouldStartFirstSteps() {
  const { user } = useAuth();
  return !user || !hasPostponedFirstSteps(user.id);
}
