import { useEffect, useRef } from 'react';

import { useBodyScrollLock } from '../controllers/useBodyScrollLock';
import { RsvpController } from '../controllers/useRsvp';
import { Invitation } from '../models/Invitation';
import { joinNames } from '../utils/names';

type Props = {
  invitation: Invitation;
  rsvp: RsvpController;
};

function personas(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// Panel con el formulario de confirmación: por persona, "Asiste" o "No asiste" (o nada, si
// todavía no sabe), preferencia alimentaria y un mensaje. Se cierra con Cancelar, tocando afuera o con Escape.
export function RsvpDialog({ invitation, rsvp }: Props) {
  useBodyScrollLock();
  const guests = invitation.group.guests;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { cancelEditing, submitting } = rsvp;

  // Solo al abrir: después el foco queda donde lo ponga el invitado.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && !submitting) {
        cancelEditing();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cancelEditing, submitting]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-dark/60 text-ink sm:items-center sm:p-4"
      onClick={() => !submitting && cancelEditing()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
        onSubmit={rsvp.submit}
        noValidate
        className="flex max-h-[92dvh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-[22px] bg-bg shadow-card sm:rounded-[22px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 overflow-y-auto px-6 pt-6 pb-4">
          <div className="text-center">
            <h2
              id="rsvp-title"
              ref={titleRef}
              tabIndex={-1}
              className="m-0 font-display text-[26px] font-normal outline-none"
            >
              {rsvp.answered ? 'Cambiar mi respuesta' : 'Confirmá tu asistencia'}
            </h2>
            <p className="m-0 mt-1.5 text-[15px] text-muted">
              Tu invitación incluye a <strong className="text-ink">{personas(guests.length)}</strong>.{' '}
              {guests.length === 1
                ? 'Contanos si vas a venir.'
                : 'Contanos quiénes vienen. Si alguien todavía no sabe, dejalo sin elegir.'}
            </p>
          </div>

          {guests.map((guest) => {
            const answer = rsvp.answers[guest.id];
            return (
              <div key={guest.id} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-card p-3.5">
                <div className="text-[17px] font-bold" id={`guest-${guest.id}`}>
                  {guest.name}
                </div>
                {/* Tocar la opción elegida otra vez la deja sin elegir (pendiente). */}
                <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby={`guest-${guest.id}`}>
                  {[
                    { value: true, label: 'Asiste' },
                    { value: false, label: 'No asiste' },
                  ].map((option) => {
                    const selected = answer.attending === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => rsvp.setAttending(guest.id, selected ? null : option.value)}
                        className={`min-h-11 cursor-pointer rounded-xl border-[1.5px] font-sans text-[15px] font-bold ${
                          selected
                            ? option.value
                              ? 'border-dark bg-dark text-bg'
                              : 'border-muted bg-muted text-bg'
                            : 'border-line bg-bg text-ink'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {answer.attending && (
                  <label className="field-label">
                    Preferencia alimentaria (opcional)
                    <input
                      type="text"
                      value={answer.dietary}
                      onChange={(e) => rsvp.setDietary(guest.id, e.target.value)}
                      placeholder="Ej: vegetariano, sin TACC"
                      maxLength={120}
                      className="field"
                    />
                  </label>
                )}
              </div>
            );
          })}

          <label className="field-label">
            Un mensaje para los novios (opcional)
            <textarea
              rows={3}
              value={rsvp.message}
              onChange={(e) => rsvp.setMessage(e.target.value)}
              placeholder="Escribí unas palabras"
              maxLength={600}
              className="field h-auto resize-none bg-card py-3.5"
            />
          </label>
        </div>

        <div className="flex flex-col gap-1 border-t border-line px-6 pt-4 pb-5">
          {rsvp.canSubmit && rsvp.pendingNames.length > 0 && (
            <p className="m-0 mb-2 text-center text-[14px] leading-[1.5] text-muted">
              {joinNames(rsvp.pendingNames)} {rsvp.pendingNames.length === 1 ? 'queda pendiente' : 'quedan pendientes'}.
              Podés completarlo más adelante desde esta misma invitación.
            </p>
          )}
          {rsvp.error && (
            <p className="m-0 mb-2 text-center text-[15px] font-semibold text-[#9B2C2C]" role="alert">
              {rsvp.error}
            </p>
          )}
          <button type="submit" disabled={submitting || !rsvp.canSubmit} className="btn btn-solid w-full">
            {submitting ? 'Enviando…' : rsvp.answered ? 'Guardar mi respuesta' : 'Confirmar asistencia'}
          </button>
          <button
            type="button"
            onClick={cancelEditing}
            disabled={submitting}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center border-0 bg-transparent font-sans text-[15px] font-bold text-accent"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
