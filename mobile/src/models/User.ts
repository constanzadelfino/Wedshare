// Usuario de la app (los novios). No depende de cómo lo guarda Supabase.
export type User = {
  id: string;
  email: string;
  // Puede faltar si la cuenta se creó sin nombre.
  name?: string;
  // false si entra solo con Google: no tiene contraseña de Wedshare para cambiar.
  hasPassword: boolean;
};
