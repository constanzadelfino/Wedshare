// Único lugar que hace pedidos a la API. En desarrollo, /api lo redirige Vite a la API local.
const API_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const NETWORK_ERROR = 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
  } catch {
    throw new ApiError(NETWORK_ERROR, 0);
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof body?.error === 'string' ? body.error : NETWORK_ERROR;
    throw new ApiError(message, response.status);
  }
  return body as T;
}
