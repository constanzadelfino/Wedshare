import { InvitationPage } from './views/InvitationPage';
import { PrivacyPage } from './views/PrivacyPage';
import { StatusScreen } from './views/StatusScreen';
import { TermsPage } from './views/TermsPage';

// Cada grupo entra por /invitacion/<token>, y los novios ven la vista previa en
// /invitacion/vista-previa/<token>. /terminos y /privacidad son los textos legales.
// La landing se suma más adelante.
const INVITATION_PATH = /^\/invitacion\/(vista-previa\/)?([^/]+)\/?$/;

export function App() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/terminos') {
    return <TermsPage />;
  }
  if (path === '/privacidad') {
    return <PrivacyPage />;
  }

  const match = window.location.pathname.match(INVITATION_PATH);
  if (!match) {
    return (
      <StatusScreen
        title="No encontramos esta invitación"
        message="Revisá que el link esté completo, tal como te lo mandaron."
      />
    );
  }
  return <InvitationPage inviteToken={decodeURIComponent(match[2])} preview={!!match[1]} />;
}
