import { useState } from 'react';

import { resetPassword, sendPasswordResetCode } from '../services/authService';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/validation';

type FieldErrors = {
  email?: string;
  code?: string;
  password?: string;
};

// Supabase manda códigos de 6 a 10 números, según cómo esté configurado el proyecto.
const CODE_PATTERN = /^\d{6,10}$/;

// Lógica de Recuperar contraseña: primero el email, después el código del mail y la contraseña nueva.
export function useRecoverPassword() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [loading, setLoading] = useState(false);

  const cleanEmail = email.trim().toLowerCase();

  async function handleSendCode() {
    setFormError(undefined);
    setNotice(undefined);
    if (!cleanEmail) {
      setFieldErrors({ email: 'Escribí tu email.' });
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setFieldErrors({ email: 'Revisá el email: parece que no es válido.' });
      return;
    }
    setFieldErrors({});

    setLoading(true);
    const { error } = await sendPasswordResetCode(cleanEmail);
    setLoading(false);
    if (error) {
      setFormError(error);
      return;
    }
    if (step === 'code') {
      setNotice('Te mandamos un código nuevo.');
    }
    setStep('code');
  }

  async function handleReset() {
    setFormError(undefined);
    setNotice(undefined);
    const errors: FieldErrors = {};
    const cleanCode = code.replace(/\s/g, '');
    if (!CODE_PATTERN.test(cleanCode)) {
      errors.code = 'Escribí el código que te llegó por mail.';
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(cleanEmail, cleanCode, password);
    // Si sale bien, la app pasa sola al Inicio porque se abre la sesión.
    if (error) {
      setFormError(error);
      setLoading(false);
    }
  }

  // Volver al paso del email, por si lo escribió mal.
  function changeEmail() {
    setStep('email');
    setCode('');
    setFormError(undefined);
    setNotice(undefined);
    setFieldErrors({});
  }

  return {
    step,
    email,
    setEmail,
    sentTo: cleanEmail,
    code,
    setCode,
    password,
    setPassword,
    fieldErrors,
    formError,
    notice,
    loading,
    handleSendCode,
    handleReset,
    changeEmail,
  };
}
