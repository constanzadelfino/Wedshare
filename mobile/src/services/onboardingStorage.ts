// Recuerda en el celular si ya se vio la presentación de la app (las pantallas de bienvenida),
// así se muestra solo la primera vez. Usa el mismo almacenamiento que la sesión de Supabase.
const INTRO_SEEN_KEY = 'wedshare.introSeen';

export function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Si no se puede guardar, la presentación vuelve a aparecer la próxima vez: no pasa nada.
  }
}
