import { useState } from 'react';

import { signIn } from '../services/authService';
import { isValidEmail } from '../utils/validation';

type FieldErrors = {
  email?: string;
  password?: string;
};

// Lógica de la pantalla de Login: datos del formulario, validación y envío.
export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function validate() {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Escribí tu email.';
    } else if (!isValidEmail(trimmedEmail)) {
      errors.email = 'Revisá el email: parece que no es válido.';
    }
    if (!password) {
      errors.password = 'Escribí tu contraseña.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleLogin() {
    setFormError(undefined);
    if (!validate()) {
      return;
    }

    setLoading(true);
    const { error } = await signIn(email.trim().toLowerCase(), password);
    // Si sale bien, la app pasa sola al Inicio porque cambia la sesión.
    if (error) {
      setFormError(error);
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    fieldErrors,
    formError,
    loading,
    handleLogin,
  };
}
