// Separa los nombres de los novios ("Ana y Juan", "Ana & Juan") en dos. Si no se puede, devuelve
// el texto entero como un solo nombre. Igual que en la web del invitado.
export function splitCoupleNames(coupleNames: string) {
  const parts = coupleNames
    .trim()
    .split(/\s+(?:y|&|e)\s+|\s*&\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length === 2 ? parts : [coupleNames.trim()];
}

// Iniciales de los novios, como en el sello del sobre: ["A", "J"].
export function coupleInitials(coupleNames: string) {
  return splitCoupleNames(coupleNames).map((name) => name.charAt(0).toUpperCase());
}
