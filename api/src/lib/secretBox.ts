import 'dotenv/config';

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

// Cifra y descifra secretos que se guardan en la base (por ahora, el token de Google Calendar),
// con AES-256-GCM y la clave CALENDAR_TOKEN_KEY de api/.env. Si alguien leyera la tabla,
// sin esa clave no podría usar los tokens.

function getKey() {
  const value = process.env.CALENDAR_TOKEN_KEY;
  const key = value ? Buffer.from(value, 'base64') : null;
  if (!key || key.length !== 32) {
    throw new Error('Falta CALENDAR_TOKEN_KEY en api/.env (32 bytes en base64).');
  }
  return key;
}

export function isSecretBoxConfigured() {
  try {
    getKey();
    return true;
  } catch {
    return false;
  }
}

// Devuelve "iv.etiqueta.cifrado", todo en base64url.
export function seal(text: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString('base64url')).join('.');
}

export function open(sealed: string) {
  const [iv, tag, encrypted] = sealed.split('.').map((part) => Buffer.from(part, 'base64url'));
  const decipher = createDecipheriv('aes-256-gcm', getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
