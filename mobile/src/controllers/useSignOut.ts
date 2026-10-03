import { useState } from 'react';

import { signOut } from '../services/authService';

// Lógica del botón "Cerrar sesión".
export function useSignOut() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSignOut() {
    setError(undefined);
    setLoading(true);
    const result = await signOut();
    // Si sale bien, la app vuelve sola al Login porque se cierra la sesión.
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return { loading, error, handleSignOut };
}
