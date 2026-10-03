import { useRsvp } from '../controllers/useRsvp';
import { Invitation } from '../models/Invitation';
import { argentinaTime } from '../utils/dates';
import { googleCalendarUrl } from '../utils/calendar';
import { ClosingFooter } from './ClosingFooter';
import { CoverSection } from './CoverSection';
import { DateSection } from './DateSection';
import { DressCodeSection } from './DressCodeSection';
import { EventsSection } from './EventsSection';
import { QrSection } from './QrSection';
import { RsvpSection } from './RsvpSection';
import { ThanksScreen } from './ThanksScreen';
import { WelcomeSection } from './WelcomeSection';

// La invitación completa, en el orden del diseño. Las secciones sin datos no se muestran.
type Props = {
  inviteToken: string;
  invitation: Invitation;
  onChange: (invitation: Invitation) => void;
};

// Lleva la pantalla a una sección, después de que se cierre lo que esté encima.
function scrollToSection(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
}

export function InvitationView({ inviteToken, invitation, onChange }: Props) {
  const { event } = invitation;
  const rsvp = useRsvp(inviteToken, invitation, onChange);

  function changeAnswer() {
    rsvp.startEditing();
    scrollToSection('rsvp');
  }

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
      <RsvpSection invitation={invitation} rsvp={rsvp} />
      <QrSection invitation={invitation} onChangeAnswer={changeAnswer} />
      <ClosingFooter />
      {rsvp.showThanks && (
        <ThanksScreen
          invitation={invitation}
          calendarUrl={calendarUrl}
          onShowPass={() => {
            rsvp.closeThanks();
            scrollToSection('qr');
          }}
          onChangeAnswer={changeAnswer}
          onClose={() => {
            rsvp.closeThanks();
            scrollToSection('rsvp');
          }}
        />
      )}
    </main>
  );
}
