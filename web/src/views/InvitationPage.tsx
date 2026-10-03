import { useInvitation } from '../controllers/useInvitation';
import { useOpening } from '../controllers/useOpening';
import { coupleInitials } from '../utils/names';
import { InvitationView } from './InvitationView';
import { OpeningScreen } from './OpeningScreen';
import { StatusScreen } from './StatusScreen';

// Página de la invitación de un grupo: carga los datos, muestra el sobre la primera vez
// y después la invitación.
export function InvitationPage({ inviteToken }: { inviteToken: string }) {
  const { state, retry } = useInvitation(inviteToken);
  const opening = useOpening(inviteToken);

  if (state.status === 'loading') {
    return <StatusScreen title="Cargando tu invitación" />;
  }
  if (state.status === 'error') {
    return <StatusScreen title="No pudimos abrir la invitación" message={state.message} onRetry={retry} />;
  }

  return (
    <>
      <InvitationView invitation={state.invitation} />
      {opening.phase !== 'open' && (
        <OpeningScreen
          initials={coupleInitials(state.invitation.event.coupleNames)}
          leaving={opening.phase === 'leaving'}
          onOpen={opening.open}
        />
      )}
    </>
  );
}
