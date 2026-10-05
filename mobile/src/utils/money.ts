// Muestra un precio en pesos con separador de miles: 120000 → "$ 120.000".
export function formatPrice(value: number) {
  return `$ ${groupThousands(String(value))}`;
}

function groupThousands(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Mientras se escribe el precio, deja solo números y agrega los puntos: 120000 → 120.000.
export function formatPriceInput(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9);
  return groupThousands(digits);
}

// Convierte el precio escrito ("120.000") a número. Vacío es null.
export function parsePriceInput(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits ? Number(digits) : null;
}
