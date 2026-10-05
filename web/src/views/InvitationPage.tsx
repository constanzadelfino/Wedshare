import { MusicButton } from '../components/MusicButton';
import { useBackgroundMusic } from '../controllers/useBackgroundMusic';
import { useInvitation } from '../controllers/useInvitation';
import { useOpening } from '../controllers/useOpening';
import { coupleInitials } from '../utils/names';
import { InvitationView } from './InvitationView';
import { OpeningScreen } from './OpeningScreen';
import { StatusScreen } from './StatusScreen';

// Página de la invitación de un grupo: carga los datos, muestra el sobre la primera vez
// y después la invitación.
export function InvitationPage({ inviteToken, preview }: { inviteToken: string; preview: boolean }) {
  const { state, retry, replace } = useInvitation(inviteToken, preview);
  const opening = useOpening(inviteToken, !preview);
  const music = useBackgroundMusic(state.status === 'ready' ? state.invitation.event.backgroundMusic : null);

  if (state.status === 'loading') {
    return <StatusScreen title="Cargando tu invitación" />;
  }
  if (state.status === 'error') {
    return <StatusScreen title="No pudimos abrir la invitación" message={state.message} onRetry={retry} />;
  }

  return (
    <>
      {preview && (
        <div className="sticky top-0 z-30 bg-dark px-4 py-2.5 text-center text-sm font-semibold text-bg">
          Vista previa: así ven la invitación tus invitados.
        </div>
      )}
      <InvitationView
        inviteToken={inviteToken}
        invitation={state.invitation}
        onChange={replace}
        musicCredit={music.track ? { title: music.track.title, credit: music.track.credit } : null}
      />
      {music.track && opening.phase === 'open' && <MusicButton playing={music.playing} onToggle={music.toggle} />}
      {opening.phase !== 'open' && (
        <OpeningScreen
          initials={coupleInitials(state.invitation.event.coupleNames)}
          leaving={opening.phase === 'leaving'}
          onOpen={() => {
            // La música arranca con el toque al sello: los celulares no dejan que suene sola.
            music.play();
            opening.open();
          }}
        />
      )}
    </>
  );
}
