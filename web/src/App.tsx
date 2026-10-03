import { InvitationPage } from './views/InvitationPage';
import { StatusScreen } from './views/StatusScreen';

// Cada grupo entra por /invitacion/<token>. La landing se suma más adelante.
const INVITATION_PATH = /^\/invitacion\/([^/]+)\/?$/;

export function App() {
  const match = window.location.pathname.match(INVITATION_PATH);
  if (!match) {
    return (
      <StatusScreen
        title="No encontramos esta invitación"
        message="Revisá que el link esté completo, tal como te lo mandaron."
      />
    );
  }
  return <InvitationPage inviteToken={decodeURIComponent(match[1])} />;
}
