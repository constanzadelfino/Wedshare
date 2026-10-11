import { useState } from 'react';

import { changePassword } from '../services/authService';
import { MIN_PASSWORD_LENGTH } from '../utils/validation';

type FieldErrors = {
  current?: string;
  next?: string;
};

// Lógica de "Cambiar contraseña" en Perfil: la actual y la nueva.
export function useChangePassword() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function save() {
    setFormError(undefined);
    const errors: FieldErrors = {};
    if (!current) {
      errors.current = 'Escribí tu contraseña actual.';
    }
    if (next.length < MIN_PASSWORD_LENGTH) {
      errors.next = `La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    } else if (next === current) {
      errors.next = 'La contraseña nueva tiene que ser distinta de la actual.';
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSaving(true);
    const { error } = await changePassword(current, next);
    setSaving(false);
    if (error) {
      setFormError(error);
      return;
    }
    setDone(true);
  }

  return { current, setCurrent, next, setNext, fieldErrors, formError, saving, done, save };
}
