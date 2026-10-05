// Cómo se hace el regalo. payment: link de pago (por ejemplo, de Mercado Pago).
// product: link de un producto. transfer: transferencia a la cuenta bancaria del evento.
export type GiftMethod = 'payment' | 'product' | 'transfer';

// El tipo elige el ícono del regalo; no se suben fotos.
export type GiftType = 'savings' | 'honeymoon' | 'experience' | 'home' | 'baby' | 'other';

export const GIFT_TYPES: { value: GiftType; label: string }[] = [
  { value: 'savings', label: 'Ahorro' },
  { value: 'honeymoon', label: 'Luna de miel' },
  { value: 'experience', label: 'Experiencias' },
  { value: 'home', label: 'Casa' },
  { value: 'baby', label: 'Bebé' },
  { value: 'other', label: 'Otro' },
];

// Una idea de regalo, tal como la devuelve la API.
export type Gift = {
  id: string;
  name: string;
  type: GiftType;
  // En pesos, sin centavos.
  price: number | null;
  method: GiftMethod;
  // Link de pago o del producto. null en los regalos por transferencia.
  url: string | null;
  // Los novios lo marcan a mano cuando ya se lo regalaron.
  given: boolean;
};

export type GiftChanges = Omit<Gift, 'id'>;

export const GIFT_METHOD_LABELS: Record<GiftMethod, string> = {
  payment: 'Link de pago',
  product: 'Link de producto',
  transfer: 'Transferencia',
};
