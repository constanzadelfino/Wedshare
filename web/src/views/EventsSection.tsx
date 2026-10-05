import { EventItemIcon } from '../components/EventItemIcon';
import { PinIcon } from '../components/Icons';
import { SectionTitle } from '../components/SectionTitle';
import { EVENT_ITEM_LABELS, InvitationItem } from '../models/Invitation';
import { dayNumber, monthName } from '../utils/dates';
import { directionsUrl } from '../utils/maps';

// Dónde y cuándo: una tarjeta por cada parte del casamiento, en el orden en que suceden
// (la API las manda ordenadas por fecha y hora).
export function EventsSection({ items }: { items: InvitationItem[] }) {
  return (
    <section id="eventos" className="sec bg-soft">
      <div className="wrap">
        <SectionTitle eyebrow="Dónde y cuándo" title="Te esperamos" />
        <div className="h-5" />
        <div className="cards">
          {items.map((item) => (
            <article key={item.id} className="card flex flex-col items-center gap-3.5 px-[22px] py-[26px] text-center">
              <span className="text-gold">
                <EventItemIcon kind={item.kind} />
              </span>
              <h3 className="m-0 font-display text-[28px] font-normal">{EVENT_ITEM_LABELS[item.kind]}</h3>
              <div className="flex w-full items-center justify-center gap-4 border-y border-line px-2 py-3.5">
                <span className="font-display text-[46px] leading-none font-normal">{dayNumber(item.date)}</span>
                <span className="flex flex-col text-left">
                  <span className="text-[14px] font-bold tracking-[0.16em] text-accent uppercase">
                    {monthName(item.date)}
                  </span>
                  <span className="text-[17px] font-semibold">{item.time} horas</span>
                </span>
              </div>
              <div>
                <div className="text-[18px] font-bold">{item.venueName}</div>
                <div className="text-[15px] text-muted">{item.address}</div>
              </div>
              <a href={directionsUrl(item)} target="_blank" rel="noreferrer" className="btn btn-outline">
                <PinIcon />
                Cómo llegar
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
