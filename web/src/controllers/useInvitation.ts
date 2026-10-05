import { useEffect, useState } from 'react';

import { Invitation } from '../models/Invitation';
import { getInvitation, getPreview } from '../services/invitationService';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; invitation: Invitation };

// Carga la invitación del grupo según el token del link, o la vista previa de los novios.
export function useInvitation(inviteToken: string, preview: boolean) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    (preview ? getPreview(inviteToken) : getInvitation(inviteToken))
      .then((invitation) => active && setState({ status: 'ready', invitation }))
      .catch((error: Error) => active && setState({ status: 'error', message: error.message }));
    return () => {
      active = false;
    };
  }, [inviteToken, preview, attempt]);

  return {
    state,
    retry: () => setAttempt((value) => value + 1),
    // Reemplaza los datos, por ejemplo con lo que devuelve la API al confirmar.
    replace: (invitation: Invitation) => setState({ status: 'ready', invitation }),
  };
}
