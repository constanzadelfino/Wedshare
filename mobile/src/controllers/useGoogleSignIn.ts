import { useState } from 'react';

import { signInWithGoogle } from '../services/authService';

// "Continuar con Google", en Login y en Registro: la cuenta se crea sola la primera vez.
export function useGoogleSignIn() {
  const [googleError, setGoogleError] = useState<string>();
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogle() {
    setGoogleError(undefined);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    // Si sale bien, la app pasa sola al Inicio porque cambia la sesión.
    setGoogleError(error);
    setGoogleLoading(false);
  }

  return { googleError, googleLoading, handleGoogle };
}
