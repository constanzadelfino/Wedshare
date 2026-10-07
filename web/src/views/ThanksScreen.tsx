import { useEffect, useRef } from 'react';

import { HeartLogo } from '../components/HeartLogo';
import { CheckIcon } from '../components/Icons';
import { Ornament } from '../components/Ornament';
import { NightStars } from '../components/TemplateDecor';
import { useTemplateId } from '../controllers/TemplateContext';
import { useBodyScrollLock } from '../controllers/useBodyScrollLock';
import { Invitation } from '../models/Invitation';
import { dayAndMonth } from '../utils/dates';

type Props = {
  invitation: Invitation;
  calendarUrl: string;
  onShowPass: () => void;
  onChangeAnswer: () => void;
  onClose: () => void;
};

function personas(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// Pantalla de agradecimiento, justo después de enviar la respuesta.
// Si nadie del grupo asiste, cambia el texto y no muestra el pase.
export function ThanksScreen({ invitation, calendarUrl, onShowPass, onChangeAnswer, onClose }: Props) {
  useBodyScrollLock();
  const noche = useTemplateId() === 'noche';
  const { event, group } = invitation;
  const attendees = group.guests.filter((guest) => guest.status === 'confirmed');
  const attending = attendees.length > 0;
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Lleva el foco al título para que los lectores de pantalla anuncien la confirmación.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="thanks-title"
      className="fixed inset-0 z-40 h-dvh overflow-y-auto bg-dark text-bg"
    >
      {noche && <NightStars />}
      <div className="relative mx-auto flex min-h-full max-w-[440px] flex-col items-center gap-4 px-7 pt-16 pb-12 text-center">
        <div className="w-[240px]">
          <Ornament />
        </div>
        <span className="mt-2 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gold text-dark">
          {attending ? <CheckIcon size={34} strokeWidth={2.4} /> : <HeartLogo width={36} height={32} />}
        </span>
        <div className="eyebrow m-0 text-gold">{attending ? 'Confirmación recibida' : 'Respuesta recibida'}</div>
        <h1
          id="thanks-title"
          ref={titleRef}
          tabIndex={-1}
          className="m-0 font-display text-[34px] leading-[1.15] font-light tracking-[0.03em] outline-none"
        >
          {attending ? '¡Gracias por confirmar tu asistencia!' : '¡Gracias por avisarnos!'}
        </h1>
        <p className="m-0 text-[17px] leading-[1.5] text-mdark">
          {attending
            ? `Te esperamos el ${dayAndMonth(event.date)} en ${event.venue}.`
            : 'Te vamos a extrañar. Si tus planes cambian, podés cambiar tu respuesta.'}
        </p>

        {attending && (
          <div className="mt-2 flex w-full flex-col gap-2.5 rounded-[18px] border border-gold px-[18px] py-4 text-left">
            <div className="text-[13px] font-bold tracking-[0.14em] text-gold uppercase">
              {personas(attendees.length)} {attendees.length === 1 ? 'confirmada' : 'confirmadas'}
            </div>
            {attendees.map((guest) => (
              <div key={guest.id} className="flex items-center gap-2.5 text-[16px] font-semibold">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gold text-dark">
                  <CheckIcon />
                </span>
                {guest.name}
              </div>
            ))}
          </div>
        )}

        <div className="mt-2 flex w-full flex-col gap-2.5">
          {attending ? (
            <>
              <button type="button" onClick={onShowPass} className="btn w-full border-0 bg-gold text-dark">
                Ver mi pase de ingreso
              </button>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="btn w-full border-[1.5px] border-gold bg-transparent text-bg"
              >
                Agendar fecha
              </a>
            </>
          ) : (
            <button type="button" onClick={onClose} className="btn w-full border-0 bg-gold text-dark">
              Volver a la invitación
            </button>
          )}
          <button
            type="button"
            onClick={onChangeAnswer}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center border-0 bg-transparent font-sans text-[15px] font-bold text-gold"
          >
            Cambiar mi respuesta
          </button>
        </div>
      </div>
    </div>
  );
}
