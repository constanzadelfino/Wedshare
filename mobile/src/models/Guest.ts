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

export type NewGuestGroup = {
  name: string;
  phone: string | null;
  // Nombres de las personas del grupo.
  guests: string[];
};
