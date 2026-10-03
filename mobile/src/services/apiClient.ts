import { supabase } from './supabaseClient';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('Falta EXPO_PUBLIC_API_URL en mobile/.env');
}

// Error con un mensaje ya listo para mostrar en pantalla.
// status es el código de la respuesta (por ejemplo 404), o 0 si no hubo conexión.
export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
  ) {
    super(message);
  }
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// Hace un pedido a la API de Wedshare con la sesión del usuario.
// body puede ser un objeto (se manda como JSON) o un FormData (por ejemplo, para subir una foto).
export async function apiRequest<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const isForm = body instanceof FormData;

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      method,
      headers: {
        // Con FormData, fetch arma solo el Content-Type con su separador.
        ...(isForm ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch (error) {
    // La causa real queda en la consola de Expo; en pantalla, un mensaje claro.
    console.warn(`Falló el pedido ${method} ${path}`, error);
    throw new ApiError('No pudimos conectarnos con el servidor. Revisá tu conexión e intentá de nuevo.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    // La API manda los errores en español en el campo "error".
    throw new ApiError(
      json?.error ?? 'Algo salió mal. Intentá de nuevo en unos minutos.',
      response.status,
    );
  }
  return json as T;
}
