import { User as SupabaseUser } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';

import { User } from '../models/User';
import { authErrorMessage } from './authErrors';
import { supabase } from './supabaseClient';

// Si sale bien no hay error; si no, trae el mensaje ya traducido para mostrar.
export type AuthResult = { error?: string };

// Quiénes escuchan los cambios de sesión, y si por ahora no hay que avisarles (ver resetPassword).
const authListeners = new Set<(user: User | null) => void>();
let holdAuthChanges = false;

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

// Recuperar contraseña, paso 1: Supabase manda un mail con un código.
// Si el email no tiene cuenta no avisa (así nadie puede averiguar qué emails están registrados).
export async function sendPasswordResetCode(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return error ? { error: authErrorMessage(error) } : {};
}

// Recuperar contraseña, paso 2: con el código se abre una sesión y se guarda la contraseña nueva.
// Mientras tanto la app no pasa al Inicio, así un error al guardar la contraseña se ve en la pantalla.
// Si el código ya se usó y falló la contraseña, el reintento no lo vuelve a pedir.
export async function resetPassword(email: string, code: string, password: string): Promise<AuthResult> {
  holdAuthChanges = true;
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'recovery' });
    if (error) {
      holdAuthChanges = false;
      return { error: authErrorMessage(error) };
    }
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: authErrorMessage(error) };
  }

  holdAuthChanges = false;
  const user = await getCurrentUser();
  authListeners.forEach((listener) => listener(user));
  return {};
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
  authListeners.add(callback);
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!holdAuthChanges) {
      callback(session ? toUser(session.user) : null);
    }
  });
  return () => {
    authListeners.delete(callback);
    data.subscription.unsubscribe();
  };
}
