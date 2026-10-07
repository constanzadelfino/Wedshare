import { EventItemIcon } from '../components/EventItemIcon';
import { SectionTitle } from '../components/SectionTitle';
import { useTemplateId } from '../controllers/TemplateContext';
import { EVENT_ITEM_LABELS, EventItemKind, InvitationItem } from '../models/Invitation';
import { TemplateId } from '../models/Template';
import { weekdayAndDate } from '../utils/dates';
import { directionsUrl } from '../utils/maps';

type Props = {
  items: InvitationItem[];
  // Fecha del casamiento: los eventos de otro día (por ejemplo, el civil) muestran su fecha.
  weddingDate: string;
};

// Dónde y cuándo, como línea de tiempo (opción elegida por Constanza): el día contado en orden,
// unido por una línea con un marcador en cada momento. La API manda los eventos ordenados.
export function EventsSection({ items, weddingDate }: Props) {
  const template = useTemplateId();
  const minimal = template === 'minimal';
  return (
    <section id="eventos" className="sec bg-soft">
      <div className="wrap max-w-[560px]">
        <SectionTitle eyebrow="Dónde y cuándo" title="Te esperamos" />
        <div className="h-6" />
        <ol className={`relative m-0 flex list-none flex-col gap-9 p-0 ${minimal ? 'pl-[34px]' : 'pl-[68px]'}`}>
          {/* La línea que une los momentos, por detrás de los marcadores. */}
          <span
            className={`absolute top-2 bottom-2 w-px ${minimal ? 'left-1 bg-line' : 'left-[27px] bg-gold'}`}
            aria-hidden="true"
          />
          {items.map((item) => (
            <li key={item.id} className="relative">
              <Marker template={template} kind={item.kind} />
              {item.date !== weddingDate && (
                <div className="text-[14px] font-semibold text-muted">{weekdayAndDate(item.date)}</div>
              )}
              <div className="font-display text-[30px] leading-tight font-light">{item.time} h</div>
              <h3 className="m-0 mt-0.5 text-[13px] font-bold tracking-[0.2em] text-accent uppercase [[data-template=minimal]_&]:text-muted">
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

// Marcador de cada momento sobre la línea: círculo con el ícono (Dorado y Rosa, que suma un
// borde punteado), rombo con doble marco (Noche azul) o un punto negro (Minimalista).
function Marker({ template, kind }: { template: TemplateId; kind: EventItemKind }) {
  if (template === 'minimal') {
    return <span className="absolute top-3 -left-[34px] h-[9px] w-[9px] rounded-full bg-ink" aria-hidden="true" />;
  }
  if (template === 'noche') {
    return (
      <span
        className="absolute top-1.5 -left-[62px] flex h-11 w-11 rotate-45 items-center justify-center border border-gold bg-soft text-gold outline-1 outline-offset-[3px] outline-gold"
        aria-hidden="true"
      >
        <span className="-rotate-45">
          <EventItemIcon kind={kind} size={24} />
        </span>
      </span>
    );
  }
  return (
    <span
      className={`absolute top-0 -left-[68px] flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-soft text-gold ${template === 'rosa' ? 'outline-1 outline-offset-[3px] outline-gold outline-dotted' : ''}`}
    >
      <EventItemIcon kind={kind} size={30} />
    </span>
  );
}
