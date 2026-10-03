// Respuesta de cada persona a la invitación.
export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export type Guest = {
  id: string;
  name: string;
  status: GuestStatus;
};

// Una familia o grupo. Recibe un link único y confirma una sola vez.
export type GuestGroup = {
  id: string;
  name: string;
  phone: string | null;
  // Va en el link de la invitación del grupo.
  inviteToken: string;
  guests: Guest[];
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
