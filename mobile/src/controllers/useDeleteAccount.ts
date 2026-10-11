import { useState } from 'react';

import { deleteAccount } from '../services/accountService';
import { ApiError } from '../services/apiClient';

// Lógica de "Eliminar mi cuenta". Si sale bien, la app vuelve sola al Login porque se cierra la sesión.
export function useDeleteAccount() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string>();

  async function handleDelete() {
    setError(undefined);
    setDeleting(true);
    try {
      await deleteAccount();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'No pudimos eliminar tu cuenta. Intentá de nuevo.');
      setDeleting(false);
    }
  }

  return { deleting, error, handleDelete };
}
