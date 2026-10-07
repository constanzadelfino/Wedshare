import { BowDivider, DecoFan, NightStars } from '../components/TemplateDecor';
import { useTemplateId } from '../controllers/TemplateContext';
import { RsvpController } from '../controllers/useRsvp';
import { Invitation } from '../models/Invitation';
import { dayAndMonth } from '../utils/dates';
import { RsvpDialog } from './RsvpDialog';

type Props = {
  invitation: Invitation;
  rsvp: RsvpController;
};

// Resumen corto de lo que respondió el grupo.
function answerSummary(invitation: Invitation) {
  const guests = invitation.group.guests;
  const attending = guests.filter((guest) => guest.status === 'confirmed').length;
  const pending = guests.filter((guest) => guest.status === 'pending').length;
  const pendingText =
    pending === 0 ? '' : pending === 1 ? ' 1 persona todavía no respondió.' : ` ${pending} personas todavía no respondieron.`;
  if (attending === 0) {
    if (pending > 0) {
      return `Nos avisaste quiénes no pueden venir.${pendingText}`;
    }
    return guests.length === 1 ? 'Nos avisaste que no podés venir.' : 'Nos avisaron que no pueden venir.';
  }
  if (guests.length === 1) {
    return 'Confirmaste tu asistencia.';
  }
  const confirmed =
    attending === guests.length
      ? `Confirmaste la asistencia de las ${guests.length} personas.`
      : `Confirmaste la asistencia de ${attending} de ${guests.length} personas.`;
  return confirmed + pendingText;
}

// Confirmación de asistencia, en versión liviana (pedido de Constanza): un botón que abre el
// formulario en un panel. Si ya respondieron, un resumen de una línea y "Cambiar mi respuesta".
export function RsvpSection({ invitation, rsvp }: Props) {
  const { event } = invitation;
  const template = useTemplateId();
  const noche = template === 'noche';
  const deadline = event.rsvpDeadline ? dayAndMonth(event.rsvpDeadline) : null;

  let intro: string;
  if (rsvp.answered) {
    intro = answerSummary(invitation);
  } else if (event.rsvpClosed) {
    intro = `La confirmación cerró el ${deadline}. Si necesitás avisar algo, escribiles a los novios.`;
  } else {
    intro = deadline ? `Por favor confirmá antes del ${deadline}.` : 'Por favor confirmá tu asistencia.';
  }

  return (
    <section id="rsvp" className="sec relative scroll-mt-4 overflow-hidden bg-dark text-bg">
      {noche && <NightStars />}
      <div className="wrap relative">
        <div className="tpl-align mx-auto max-w-[560px]">
          {noche && (
            <div className="mb-4">
              <DecoFan width={100} />
            </div>
          )}
          {template === 'rosa' && (
            <div className="mb-4">
              <BowDivider width={200} />
            </div>
          )}
          <div className="eyebrow text-gold">Confirmación de asistencia</div>
          <h2 className="h2 text-bg">Esperamos contar con tu presencia</h2>
          <p className="mx-auto mt-0 mb-7 text-[17px] leading-[1.55] text-mdark">{intro}</p>

          {!event.rsvpClosed && (
            <button
              type="button"
              onClick={rsvp.startEditing}
              className={rsvp.answered ? 'btn border-[1.5px] border-gold bg-transparent text-gold' : 'btn border-0 bg-gold text-dark'}
            >
              {rsvp.answered ? 'Cambiar mi respuesta' : 'Confirmar asistencia'}
            </button>
          )}
          {event.rsvpClosed && rsvp.answered && (
            <p className="m-0 text-[14px] text-mdark">
              La confirmación cerró. Si necesitás cambiar algo, escribiles a los novios.
            </p>
          )}
        </div>
      </div>
      {rsvp.editing && <RsvpDialog invitation={invitation} rsvp={rsvp} />}
    </section>
  );
}
