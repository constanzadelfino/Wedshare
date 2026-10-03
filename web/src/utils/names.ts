// Separa "[Nombre] y [Nombre]" (o con "&") en los dos nombres de la pareja.
// Si no se puede separar, devuelve el texto entero como un solo nombre.
export function splitCoupleNames(coupleNames: string | null) {
  const text = coupleNames?.trim();
  if (!text) {
    return [];
  }
  const parts = text.split(/\s+(?:y|&|e)\s+|\s*&\s*/i).map((part) => part.trim()).filter(Boolean);
  return parts.length === 2 ? parts : [text];
}

// Iniciales para el sello del sobre: "A & B".
export function coupleInitials(coupleNames: string | null) {
  return splitCoupleNames(coupleNames).map((name) => name.charAt(0).toUpperCase());
}
