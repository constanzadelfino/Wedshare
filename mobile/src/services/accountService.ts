import { apiRequest } from './apiClient';
import { supabase } from './supabaseClient';

// Borra la cuenta y todo el casamiento en la API. Después cierra la sesión en el celular
// (solo acá: el usuario ya no existe en Supabase), y la app vuelve sola al Login.
export async function deleteAccount() {
  await apiRequest<void>('DELETE', '/account');
  await supabase.auth.signOut({ scope: 'local' });
}
