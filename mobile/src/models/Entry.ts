// Una persona confirmada del grupo. enteredAt es la hora en que ingresó (ISO), o null si todavía no.
export type EntryGuest = {
  id: string;
  name: string;
  enteredAt: string | null;
};

// Lo que se ve al escanear un QR. guests son solo las personas confirmadas:
// el pase vale para ellas. Si está vacío, nadie del grupo confirmó.
export type EntryPass = {
  groupName: string;
  guests: EntryGuest[];
};

const QR_PREFIX = 'wedshare:';

// El QR de la invitación lleva "wedshare:<código>". Devuelve el código, o null si es otro QR.
export function parseEntryQr(data: string) {
  const value = data.trim();
  if (!value.startsWith(QR_PREFIX)) {
    return null;
  }
  return value.slice(QR_PREFIX.length) || null;
}
