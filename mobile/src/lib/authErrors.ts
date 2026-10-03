import { AuthError } from '@supabase/supabase-js';

export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email);
}

// Traduce los errores de Supabase Auth a mensajes en español para mostrar en pantalla.
export function authErrorMessage(error: AuthError) {
  if (error.name === 'AuthRetryableFetchError' || error.status === 0) {
    return 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';
  }

  switch (error.code) {
    case 'invalid_credentials':
      return 'El email o la contraseña no son correctos.';
    case 'user_already_exists':
    case 'email_exists':
      return 'Ya hay una cuenta con este email. Probá ingresar.';
    case 'weak_password':
      return `La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    case 'email_address_invalid':
      return 'Revisá el email: parece que no es válido.';
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'Hubo demasiados intentos. Esperá unos minutos y volvé a probar.';
    default:
      return 'Algo salió mal. Intentá de nuevo en unos minutos.';
  }
}
