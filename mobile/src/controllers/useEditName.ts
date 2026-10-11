import { router } from 'expo-router';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { updateName } from '../services/authService';

// Lógica de "Tu nombre" en Perfil. Al guardar, la sesión avisa el cambio y Perfil se actualiza solo.
export function useEditName() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [fieldError, setFieldError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  async function save() {
    setFormError(undefined);
    const cleanName = name.trim().replace(/\s+/g, ' ');
    if (!cleanName) {
      setFieldError('Escribí tu nombre.');
      return;
    }
    setFieldError(undefined);
    if (cleanName === user?.name) {
      router.back();
      return;
    }

    setSaving(true);
    const { error } = await updateName(cleanName);
    if (error) {
      setFormError(error);
      setSaving(false);
      return;
    }
    router.back();
  }

  return { name, setName, fieldError, formError, saving, save };
}
