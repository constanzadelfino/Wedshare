import { CheckIcon } from '../components/Icons';
import { RsvpController } from '../controllers/useRsvp';
import { Invitation } from '../models/Invitation';
import { dayAndMonth } from '../utils/dates';

type Props = {
  invitation: Invitation;
  rsvp: RsvpController;
};

function personas(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// Confirmación de asistencia: una sola por grupo. Muestra el formulario, el resumen de la
// respuesta ya enviada o el aviso de que la confirmación cerró.
export function RsvpSection({ invitation, rsvp }: Props) {
  const { event } = invitation;
  const deadline = event.rsvpDeadline ? dayAndMonth(event.rsvpDeadline) : null;

  let intro: string;
  if (event.rsvpClosed) {
    intro = rsvp.answered ? 'Gracias por responder.' : `La confirmación cerró el ${deadline}.`;
  } else if (rsvp.answered && !rsvp.editing) {
    intro = 'Gracias por responder.';
  } else {
    intro = deadline ? `Por favor confirmá antes del ${deadline}.` : 'Por favor confirmá tu asistencia.';
  }

  return (
    <section id="rsvp" className="sec scroll-mt-4 bg-dark text-bg">
      <div className="wrap">
        <div className="mx-auto max-w-[600px]">
          <div className="text-center">
            <div className="eyebrow text-gold">Confirmación de asistencia</div>
            <h2 className="h2 text-bg">Esperamos contar con tu presencia</h2>
            <p className="mx-auto mt-0 mb-7 max-w-[560px] text-[17px] leading-[1.55] text-mdark">{intro}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-[22px] bg-bg px-[22px] py-[30px] text-ink outline-1 -outline-offset-[10px] outline-gold">
            {event.rsvpClosed && !rsvp.answered ? (
              <p className="m-0 text-center text-[16px] leading-[1.55] text-muted">
                Si necesitás avisar algo, escribiles a los novios.
              </p>
            ) : rsvp.editing ? (
              <RsvpForm invitation={invitation} rsvp={rsvp} />
            ) : (
              <RsvpSummary invitation={invitation} rsvp={rsvp} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RsvpForm({ invitation, rsvp }: Props) {
  const guests = invitation.group.guests;
  return (
    <form onSubmit={rsvp.submit} className="flex flex-col gap-4" noValidate>
      <p className="m-0 text-center text-[15px] text-muted">
        Tu invitación incluye a <strong className="text-ink">{personas(guests.length)}</strong>.{' '}
        {guests.length === 1 ? 'Tildá si asistís.' : 'Tildá quiénes asisten.'}
      </p>

      {guests.map((guest) => {
        const answer = rsvp.answers[guest.id];
        return (
          <div key={guest.id} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-card p-3.5">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[17px] font-bold">
              <input
                type="checkbox"
                checked={answer.attending}
                onChange={(e) => rsvp.setAttending(guest.id, e.target.checked)}
                className="m-0 h-6 w-6 shrink-0 accent-accent"
              />
              {guest.name}
            </label>
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

      {rsvp.error && (
        <p className="m-0 text-center text-[15px] font-semibold text-[#9B2C2C]" role="alert">
          {rsvp.error}
        </p>
      )}

      <button type="submit" disabled={rsvp.submitting} className="btn btn-solid w-full">
        {rsvp.submitting ? 'Enviando…' : rsvp.answered ? 'Guardar mi respuesta' : 'Confirmar asistencia'}
      </button>
      {rsvp.answered && (
        <button
          type="button"
          onClick={rsvp.cancelEditing}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center border-0 bg-transparent font-sans text-[15px] font-bold text-accent"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

function RsvpSummary({ invitation, rsvp }: Props) {
  const message = invitation.group.rsvp?.message;
  return (
    <>
      <div className="eyebrow m-0 text-center text-muted">Tu respuesta</div>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {invitation.group.guests.map((guest) => {
          const attending = guest.status === 'confirmed';
          return (
            <li key={guest.id} className="flex items-start gap-3 rounded-2xl border border-line bg-card p-3.5">
              <span
                className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${attending ? 'bg-gold text-dark' : 'border border-line'}`}
                aria-hidden="true"
              >
                {attending && <CheckIcon />}
              </span>
              <span className="flex flex-col">
                <span className="text-[16px] font-bold">{guest.name}</span>
                <span className="text-[14px] text-muted">
                  {attending ? (guest.dietary ?? 'Asiste') : 'No asiste'}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      {message && (
        <p className="m-0 text-center text-[16px] leading-[1.55] text-muted whitespace-pre-line">“{message}”</p>
      )}
      {invitation.event.rsvpClosed ? (
        <p className="m-0 text-center text-[14px] text-muted">
          La confirmación cerró. Si necesitás cambiar algo, escribiles a los novios.
        </p>
      ) : (
        <button type="button" onClick={rsvp.startEditing} className="btn btn-outline w-full">
          Cambiar mi respuesta
        </button>
      )}
    </>
  );
}
