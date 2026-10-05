// Ideas de regalos tal como las manda y las recibe la app.
// La tabla está definida en prisma/schema.prisma.

// Cómo se hace el regalo. payment: link de pago (por ejemplo, de Mercado Pago).
// product: link de un producto. transfer: transferencia a la cuenta bancaria del evento.
export type GiftMethod = 'payment' | 'product' | 'transfer';
const GIFT_METHODS: GiftMethod[] = ['payment', 'product', 'transfer'];

// Elige el ícono del regalo. No se suben fotos.
export const GIFT_TYPES = ['savings', 'honeymoon', 'experience', 'home', 'baby', 'other'] as const;
export type GiftType = (typeof GIFT_TYPES)[number];

export type GiftData = {
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

export type GiftInput = Omit<GiftData, 'id'>;

const MAX_PRICE = 100_000_000;

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

type ValidationResult = { data: Partial<GiftInput>; error?: undefined } | { error: string };

// Al crear, nombre y forma de regalar son obligatorios, y el link también salvo en las
// transferencias. Al editar (partial), se puede mandar solo lo que cambia, pero la forma
// de regalar y el link van siempre juntos.
export function validateGiftInput(body: unknown, partial: boolean): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Faltan los datos del regalo.' };
  }
  const input = body as Record<string, unknown>;
  const data: Partial<GiftInput> = {};

  if (input.name !== undefined || !partial) {
    if (typeof input.name !== 'string' || !input.name.trim()) {
      return { error: 'Escribí el nombre del regalo.' };
    }
    if (input.name.trim().length > 80) {
      return { error: 'El nombre del regalo puede tener hasta 80 caracteres.' };
    }
    data.name = input.name.trim();
  }

  if (input.type !== undefined) {
    if (!GIFT_TYPES.includes(input.type as GiftType)) {
      return { error: 'Elegí el tipo de regalo.' };
    }
    data.type = input.type as GiftType;
  }

  if (input.price !== undefined) {
    if (input.price === null) {
      data.price = null;
    } else if (
      typeof input.price !== 'number' ||
      !Number.isInteger(input.price) ||
      input.price <= 0 ||
      input.price > MAX_PRICE
    ) {
      return { error: 'Revisá el precio: escribí solo números, sin centavos.' };
    } else {
      data.price = input.price;
    }
  }

  if (input.method !== undefined || input.url !== undefined || !partial) {
    if (!GIFT_METHODS.includes(input.method as GiftMethod)) {
      return { error: 'Elegí cómo te hacen el regalo: link de pago, producto o transferencia.' };
    }
    data.method = input.method as GiftMethod;
    if (data.method === 'transfer') {
      data.url = null;
    } else {
      const url = typeof input.url === 'string' ? input.url.trim() : '';
      if (!url) {
        return { error: 'Pegá el link de pago o del producto.' };
      }
      if (!isValidUrl(url) || url.length > 1000) {
        return { error: 'Revisá el link: tiene que empezar con https://.' };
      }
      data.url = url;
    }
  }

  if (input.given !== undefined) {
    if (typeof input.given !== 'boolean') {
      return { error: 'El campo given tiene que ser verdadero o falso.' };
    }
    data.given = input.given;
  }

  return { data };
}
