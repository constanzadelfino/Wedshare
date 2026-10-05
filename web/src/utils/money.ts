// Muestra un precio en pesos con separador de miles: 120000 → "$ 120.000".
export function formatPrice(value: number) {
  return `$ ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
