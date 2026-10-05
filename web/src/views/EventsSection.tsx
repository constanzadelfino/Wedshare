import { EventItemIcon } from '../components/EventItemIcon';
import { SectionTitle } from '../components/SectionTitle';
import { EVENT_ITEM_LABELS, InvitationItem } from '../models/Invitation';
import { weekdayAndDate } from '../utils/dates';
import { directionsUrl } from '../utils/maps';

type Props = {
  items: InvitationItem[];
  // Fecha del casamiento: los eventos de otro día (por ejemplo, el civil) muestran su fecha.
  weddingDate: string;
};

// Dónde y cuándo, como línea de tiempo (opción elegida por Constanza): el día contado en orden,
// unido por una línea dorada con el ícono de cada momento. La API manda los eventos ordenados.
export function EventsSection({ items, weddingDate }: Props) {
  return (
    <section id="eventos" className="sec bg-soft">
      <div className="wrap max-w-[560px]">
        <SectionTitle eyebrow="Dónde y cuándo" title="Te esperamos" />
        <div className="h-6" />
        <ol className="relative m-0 flex list-none flex-col gap-9 p-0 pl-[68px]">
          {/* La línea que une los momentos, por detrás de los círculos. */}
          <span className="absolute top-2 bottom-2 left-[27px] w-px bg-gold" aria-hidden="true" />
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute top-0 -left-[68px] flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-soft text-gold">
                <EventItemIcon kind={item.kind} size={30} />
              </span>
              {item.date !== weddingDate && (
                <div className="text-[14px] font-semibold text-muted">{weekdayAndDate(item.date)}</div>
              )}
              <div className="font-display text-[30px] leading-tight font-light">{item.time} h</div>
              <h3 className="m-0 mt-0.5 text-[13px] font-bold tracking-[0.2em] text-accent uppercase">
                {EVENT_ITEM_LABELS[item.kind]}
              </h3>
              <div className="mt-2.5 text-[17px] font-bold">{item.venueName}</div>
              <div className="text-[15px] leading-[1.5] text-muted">{item.address}</div>
              <a
                href={directionsUrl(item)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex min-h-11 items-center font-bold text-accent underline underline-offset-[3px]"
              >
                Cómo llegar
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
