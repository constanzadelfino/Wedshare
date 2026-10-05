// Respuesta de cada persona a la invitación.
export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type Guest = {
  id: string;
  name: string;
  status: GuestStatus;
  // Preferencia alimentaria que anotó al confirmar.
  dietary: string | null;
};

// Una familia o grupo. Recibe un link único y confirma una sola vez.
export type GuestGroup = {
  id: string;
  name: string;
  phone: string | null;
  // Va en el link de la invitación del grupo.
  inviteToken: string;
  guests: Guest[];
  // Mensaje que dejó el grupo para los novios al confirmar.
  message: string | null;
};

// Al editar: si una persona trae id, se conserva (con su respuesta); si no, se agrega.
export type GuestGroupChanges = {
  name?: string;
  phone?: string | null;
  guests?: { id?: string; name: string }[];
};

// Alguien que va solo se guarda como un grupo de una persona con su mismo nombre.
export function isSingleGuest(group: GuestGroup) {
  return group.guests.length === 1 && group.guests[0].name === group.name;
}

export type NewGuestGroup = {
  name: string;
  phone: string | null;
  // Nombres de las personas del grupo.
  guests: string[];
};

// Los grupos de varias personas son familias y su nombre siempre empieza con "Familia".
// En el formulario se escribe solo el apellido.
export const FAMILY_PREFIX = 'Familia';

// "Pérez" → "Familia Pérez". Si ya lo escribieron con "Familia", no se repite.
export function familyName(surname: string) {
  return `${FAMILY_PREFIX} ${familySurname(surname)}`;
}

// "Familia Pérez" → "Pérez", para mostrarlo en el campo.
export function familySurname(name: string) {
  return name.trim().replace(/^familia\s+/i, '').trim();
}
