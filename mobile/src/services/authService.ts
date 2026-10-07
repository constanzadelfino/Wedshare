import { User as SupabaseUser } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';

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

// Login con Google: Supabase arma el link, se abre en una ventana del navegador y, al terminar,
// Google vuelve a la app con la sesión en la dirección (después del "#").
// Si la persona cierra la ventana sin elegir cuenta, no hay error: no pasa nada.
export async function signInWithGoogle(): Promise<AuthResult> {
  // Siempre el esquema propio de la app: Supabase rechaza la dirección de Expo Go (exp://<IP>…),
  // y la ventana de login atrapa wedshare:// al volver aunque la app corra dentro de Expo Go.
  const redirectTo = 'wedshare://auth-callback';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) {
    return { error: authErrorMessage(error) };
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') {
    return {};
  }

  const params = new URLSearchParams(result.url.split('#')[1] ?? result.url.split('?')[1] ?? '');
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) {
    return { error: 'No pudimos ingresar con Google. Intentá de nuevo.' };
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return sessionError ? { error: authErrorMessage(sessionError) } : {};
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
