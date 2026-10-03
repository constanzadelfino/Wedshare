import { useState } from 'react';

import { markOpened, wasOpened } from '../services/openingStorage';

// Duración de la animación del sobre (ver index.css).
const LEAVE_MS = 1000;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Pantalla de apertura: se ve la primera vez y después se saltea.
// Si el celular tiene las animaciones reducidas, el sobre se abre sin animación.
export function useOpening(inviteToken: string) {
  const [phase, setPhase] = useState<'closed' | 'leaving' | 'open'>(() =>
    wasOpened(inviteToken) ? 'open' : 'closed',
  );

  function open() {
    if (phase !== 'closed') {
      return;
    }
    markOpened(inviteToken);
    window.scrollTo(0, 0);
    if (prefersReducedMotion()) {
      setPhase('open');
      return;
    }
    setPhase('leaving');
    setTimeout(() => setPhase('open'), LEAVE_MS);
  }

  return { phase, open };
}
