import { User as SupabaseUser } from '@supabase/supabase-js';

import { User } from '../models/User';
import { authErrorMessage } from './authErrors';
import { supabase } from './supabaseClient';

// Si sale bien no hay error; si no, trae el mensaje ya traducido para mostrar.
export type AuthResult = { error?: string };

function toUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name: supabaseUser.user_metadata?.full_name,
  };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? { error: authErrorMessage(error) } : {};
}

export async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    // El nombre queda en los datos del usuario, donde también lo guarda Google.
    options: { data: { full_name: name } },
  });
  return error ? { error: authErrorMessage(error) } : {};
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  return error ? { error: authErrorMessage(error) } : {};
}

// Lee la sesión guardada en el celular al abrir la app.
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();
  return data.session ? toUser(data.session.user) : null;
}

// Avisa en cada ingreso, registro o cierre de sesión. Devuelve la función para dejar de escuchar.
export function onAuthChange(callback: (user: User | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ? toUser(session.user) : null);
  });
  return () => data.subscription.unsubscribe();
}
