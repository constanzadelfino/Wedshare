import { Fragment } from 'react';

import { CalendarIcon } from '../components/Icons';
import { SectionTitle } from '../components/SectionTitle';
import { useCountdown } from '../controllers/useCountdown';
import { dayAndMonth } from '../utils/dates';

type Props = {
  date: string;
  start: Date;
  calendarUrl: string;
};

// Agendá la fecha: cuenta regresiva y botón para guardarla en Google Calendar.
export function DateSection({ date, start, calendarUrl }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(start);
  const units = [
    { value: days, label: 'días' },
    { value: hours, label: 'hs' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'seg' },
  ];

  return (
    <section id="fecha" className="sec">
      <div className="wrap tpl-align">
        <SectionTitle eyebrow="Agendá la fecha" title={dayAndMonth(date)} />
        <div
          className="countdown mt-5 mb-7 flex justify-center gap-1.5 min-[390px]:gap-2"
          role="timer"
          aria-label={`Faltan ${days} días, ${hours} horas y ${minutes} minutos`}
        >
          {units.map((unit, index) => (
            <Fragment key={unit.label}>
              {index > 0 && (
                <span className="countdown-sep self-center font-display text-[28px] text-gold" aria-hidden="true">
                  :
                </span>
              )}
              <div
                className="countdown-box flex min-w-[60px] flex-col items-center gap-0.5 rounded-[14px] border border-gold px-2 py-3 min-[390px]:min-w-[68px]"
                aria-hidden="true"
              >
                <span className="font-display text-[28px] leading-none font-light text-ink tabular-nums">
                  {unit.value}
                </span>
                <span className="text-[11px] font-bold tracking-[0.18em] text-accent uppercase">
                  {unit.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <a href={calendarUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
          <CalendarIcon />
          Agendar fecha
        </a>
      </div>
    </section>
  );
}
