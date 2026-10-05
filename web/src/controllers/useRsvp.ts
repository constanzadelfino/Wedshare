import { FormEvent, useState } from 'react';

import { Invitation } from '../models/Invitation';
import { createRsvp, updateRsvp } from '../services/invitationService';

// attending: true asiste, false no asiste, null todavía no eligió (queda pendiente).
type Answer = { attending: boolean | null; dietary: string };

// Respuestas iniciales: lo que ya contestó cada persona; si nunca respondió, sin elegir.
function initialAnswers(invitation: Invitation) {
  return Object.fromEntries(
    invitation.group.guests.map((guest) => [
      guest.id,
      {
        attending: guest.status === 'confirmed' ? true : guest.status === 'declined' ? false : null,
        dietary: guest.dietary ?? '',
      },
    ]),
  ) as Record<string, Answer>;
}

// Confirmación de asistencia: el formulario por persona (en un panel que se abre con un botón),
// el mensaje, el envío y la pantalla de agradecimiento que aparece después de enviar.
export function useRsvp(
  inviteToken: string,
  invitation: Invitation,
  onSaved: (invitation: Invitation) => void,
) {
  const answered = invitation.group.rsvp !== null;
  // true mientras el panel con el formulario está abierto.
  const [editing, setEditing] = useState(false);
  const [answers, setAnswers] = useState(() => initialAnswers(invitation));
  const [message, setMessage] = useState(invitation.group.rsvp?.message ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  function setAttending(guestId: string, attending: boolean | null) {
    setAnswers((current) => ({ ...current, [guestId]: { ...current[guestId], attending } }));
  }

  function setDietary(guestId: string, dietary: string) {
    setAnswers((current) => ({ ...current, [guestId]: { ...current[guestId], dietary } }));
  }

  // Abre el panel con la última respuesta guardada (o todos asisten, la primera vez).
  function startEditing() {
    setAnswers(initialAnswers(invitation));
    setMessage(invitation.group.rsvp?.message ?? '');
    setError(null);
    setShowThanks(false);
    setEditing(true);
  }

  function cancelEditing() {
    setError(null);
    setEditing(false);
  }

  // Se puede enviar si al menos una persona tiene respuesta. Las que quedan sin elegir
  // siguen pendientes y pueden responder más adelante.
  const canSubmit = invitation.group.guests.some((guest) => answers[guest.id]?.attending != null);
  const pendingNames = invitation.group.guests
    .filter((guest) => answers[guest.id]?.attending == null)
    .map((guest) => guest.name);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting || !canSubmit) {
      return;
    }
    if (invitation.preview) {
      setError('Esto es una vista previa: la respuesta no se guarda. Así lo ven tus invitados.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const input = {
      guests: invitation.group.guests.map((guest) => ({
        id: guest.id,
        attending: answers[guest.id]?.attending ?? null,
        dietary: answers[guest.id]?.attending ? answers[guest.id].dietary.trim() || null : null,
      })),
      message: message.trim() || null,
    };
    try {
      const saved = answered
        ? await updateRsvp(inviteToken, input)
        : await createRsvp(inviteToken, input);
      onSaved(saved);
      setEditing(false);
      setShowThanks(true);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    answered,
    editing,
    answers,
    canSubmit,
    pendingNames,
    message,
    submitting,
    error,
    showThanks,
    setAttending,
    setDietary,
    setMessage,
    startEditing,
    cancelEditing,
    submit,
    closeThanks: () => setShowThanks(false),
  };
}

export type RsvpController = ReturnType<typeof useRsvp>;
