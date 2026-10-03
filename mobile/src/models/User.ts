// Usuario de la app (los novios). No depende de cómo lo guarda Supabase.
export type User = {
  id: string;
  email: string;
  // Puede faltar si la cuenta se creó sin nombre.
  name?: string;
};
