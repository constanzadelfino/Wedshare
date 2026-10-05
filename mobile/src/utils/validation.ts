export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email);
}

const PHONE_CHARACTERS = /^[\d\s()+-]+$/;

// Teléfono con código de área: solo números, espacios, +, guiones o paréntesis, y entre 8 y 15 dígitos.
export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return PHONE_CHARACTERS.test(phone) && digits.length >= 8 && digits.length <= 15;
}

// Pasa a minúsculas y quita las tildes, para buscar "Jose" y encontrar "José".
export function normalizeForSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Alias de una cuenta en Argentina: de 6 a 20 letras, números, puntos o guiones.
export const BANK_ALIAS_PATTERN = /^[A-Za-z0-9.-]{6,20}$/;

// Muestra solo el final del CBU: "CBU ···· 4821".
export function maskCbu(cbu: string) {
  return `CBU ···· ${cbu.slice(-4)}`;
}
