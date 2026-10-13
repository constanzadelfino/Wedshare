import { useState } from 'react';

import { signOut } from '../services/authService';
import { forgetThisPhone } from '../services/notificationService';

// Lógica del botón "Cerrar sesión".
export function useSignOut() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSignOut() {
    setError(undefined);
    setLoading(true);
    // Con otra cuenta, este celular no tiene que recibir los avisos de esta.
    await forgetThisPhone();
    const result = await signOut();
    // Si sale bien, la app vuelve sola al Login porque se cierra la sesión.
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return { loading, error, handleSignOut };
}
