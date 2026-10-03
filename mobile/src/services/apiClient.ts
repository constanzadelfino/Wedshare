import { supabase } from './supabaseClient';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('Falta EXPO_PUBLIC_API_URL en mobile/.env');
}

// Error con un mensaje ya listo para mostrar en pantalla.
export class ApiError extends Error {}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// Hace un pedido a la API de Wedshare con la sesión del usuario.
export async function apiRequest<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('No pudimos conectarnos con el servidor. Revisá tu conexión e intentá de nuevo.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    // La API manda los errores en español en el campo "error".
    throw new ApiError(json?.error ?? 'Algo salió mal. Intentá de nuevo en unos minutos.');
  }
  return json as T;
}
