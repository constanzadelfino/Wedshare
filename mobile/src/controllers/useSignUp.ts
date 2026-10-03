import { useState } from 'react';

import { signUp } from '../services/authService';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/validation';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

// Lógica de la pantalla de Registro: datos del formulario, validación y envío.
export function useSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function validate() {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();
    if (!name.trim()) {
      errors.name = 'Escribí tu nombre.';
    }
    if (!trimmedEmail) {
      errors.email = 'Escribí tu email.';
    } else if (!isValidEmail(trimmedEmail)) {
      errors.email = 'Revisá el email: parece que no es válido.';
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignUp() {
    setFormError(undefined);
    if (!validate()) {
      return;
    }

    setLoading(true);
    const { error } = await signUp(name.trim(), email.trim().toLowerCase(), password);
    // Si sale bien, la app pasa sola al Inicio porque se crea la sesión.
    if (error) {
      setFormError(error);
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    fieldErrors,
    formError,
    loading,
    handleSignUp,
  };
}
