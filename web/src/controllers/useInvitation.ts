import { useEffect, useState } from 'react';

import { Invitation } from '../models/Invitation';
import { getInvitation } from '../services/invitationService';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; invitation: Invitation };

// Carga la invitación del grupo según el token del link.
export function useInvitation(inviteToken: string) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    getInvitation(inviteToken)
      .then((invitation) => active && setState({ status: 'ready', invitation }))
      .catch((error: Error) => active && setState({ status: 'error', message: error.message }));
    return () => {
      active = false;
    };
  }, [inviteToken, attempt]);

  return { state, retry: () => setAttempt((value) => value + 1) };
}
