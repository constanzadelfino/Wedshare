import { FormEvent, useState } from 'react';

import { Invitation } from '../models/Invitation';
import { createRsvp, updateRsvp } from '../services/invitationService';

type Answer = { attending: boolean; dietary: string };

// Respuestas iniciales: lo que ya contestó el grupo o, si es la primera vez, todos asisten.
function initialAnswers(invitation: Invitation) {
  const answered = invitation.group.rsvp !== null;
  return Object.fromEntries(
    invitation.group.guests.map((guest) => [
      guest.id,
      { attending: answered ? guest.status === 'confirmed' : true, dietary: guest.dietary ?? '' },
    ]),
  ) as Record<string, Answer>;
}

// Confirmación de asistencia: el formulario por persona, el mensaje, el envío y
// la pantalla de agradecimiento que aparece después de enviar.
export function useRsvp(
  inviteToken: string,
  invitation: Invitation,
  onSaved: (invitation: Invitation) => void,
) {
  const answered = invitation.group.rsvp !== null;
  const [editing, setEditing] = useState(!answered);
  const [answers, setAnswers] = useState(() => initialAnswers(invitation));
  const [message, setMessage] = useState(invitation.group.rsvp?.message ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  function setAttending(guestId: string, attending: boolean) {
    setAnswers((current) => ({ ...current, [guestId]: { ...current[guestId], attending } }));
  }

  function setDietary(guestId: string, dietary: string) {
    setAnswers((current) => ({ ...current, [guestId]: { ...current[guestId], dietary } }));
  }

  // Vuelve al formulario con la última respuesta guardada.
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

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting) {
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
        attending: answers[guest.id]?.attending ?? false,
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
