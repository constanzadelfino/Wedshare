import { Invitation } from '../models/Invitation';
import { argentinaTime } from '../utils/dates';
import { googleCalendarUrl } from '../utils/calendar';
import { ClosingFooter } from './ClosingFooter';
import { CoverSection } from './CoverSection';
import { DateSection } from './DateSection';
import { DressCodeSection } from './DressCodeSection';
import { EventsSection } from './EventsSection';
import { WelcomeSection } from './WelcomeSection';

// La invitación completa, en el orden del diseño. Las secciones sin datos no se muestran.
export function InvitationView({ invitation }: { invitation: Invitation }) {
  const { event } = invitation;

  // La cuenta regresiva y el calendario usan la primera parte del casamiento de ese día
  // (por ejemplo, la ceremonia). Si no hay ninguna, el día a las 00:00.
  const firstItem = event.items.find((item) => item.date === event.date);
  const start = argentinaTime(event.date, firstItem?.time);
  const calendarUrl = googleCalendarUrl({
    title: event.coupleNames ? `Casamiento de ${event.coupleNames}` : event.name,
    start,
    location: firstItem ? `${firstItem.venueName}, ${firstItem.address}` : event.venue,
    details: window.location.href,
  });

  return (
    <main className="w-full bg-bg font-sans text-ink">
      <CoverSection invitation={invitation} />
      {event.welcomeMessage && <WelcomeSection message={event.welcomeMessage} />}
      <DateSection date={event.date} start={start} calendarUrl={calendarUrl} />
      {event.items.length > 0 && <EventsSection items={event.items} />}
      {event.dressCode && <DressCodeSection dressCode={event.dressCode} />}
      <ClosingFooter />
    </main>
  );
}
