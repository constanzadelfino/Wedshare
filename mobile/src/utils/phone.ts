// Convierte un teléfono de Argentina al formato internacional que usa WhatsApp (549 + área + número).
// Ej: "11 2345 6789" → "5491123456789". Devuelve null si no tiene una cantidad de dígitos razonable.
export function toWhatsAppNumber(phone: string) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('54')) {
    digits = digits.slice(2);
    if (digits.startsWith('9')) {
      digits = digits.slice(1);
    }
  }
  // Se quita el 0 del código de área si lo escribieron (011 → 11).
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  // Código de área + número sin el 15: siempre 10 dígitos en Argentina.
  return digits.length === 10 ? `549${digits}` : null;
}
