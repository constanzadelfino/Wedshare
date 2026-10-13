import * as WebBrowser from 'expo-web-browser';

import { Event } from '../models/Event';
import { apiRequest } from './apiClient';
import { supabase } from './supabaseClient';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';

export type CalendarPermission = { refreshToken?: string; error?: string };

// Pide a Google permiso para agendar en el calendario de los novios. Usa la misma ventana que el
// login con Google (Supabase la arma), pero no cambia la sesión: solo se queda con el token de
// Google, que después se le pasa a la API. Si la persona cierra la ventana, no hay token ni error.
export async function requestCalendarPermission(): Promise<CalendarPermission> {
  // Google propone la cuenta con el mismo email de la sesión, si existe.
  const email = (await supabase.auth.getSession()).data.session?.user.email;
  const redirectTo = 'wedshare://auth-callback';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
      scopes: CALENDAR_SCOPE,
      // offline + consent: Google manda un token que sirve aunque la app esté cerrada.
      queryParams: { access_type: 'offline', prompt: 'consent', ...(email ? { login_hint: email } : {}) },
    },
  });
  if (error) {
    return { error: 'No pudimos abrir Google. Intentá de nuevo.' };
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') {
    return {};
  }

  const params = new URLSearchParams(result.url.split('#')[1] ?? result.url.split('?')[1] ?? '');
  const refreshToken = params.get('provider_refresh_token');
  if (!refreshToken) {
    return { error: 'No pudimos conectar tu Google Calendar. Intentá de nuevo.' };
  }
  return { refreshToken };
}

// La API guarda el permiso y agenda el casamiento. Devuelve el evento actualizado.
export function connectCalendar(refreshToken: string) {
  return apiRequest<Event>('POST', '/calendar/connection', { refreshToken });
}

// Saca del calendario lo que agendó Wedshare y desconecta la cuenta.
export function disconnectCalendar() {
  return apiRequest<Event>('DELETE', '/calendar/connection');
}
