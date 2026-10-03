// Recuerda en este navegador si el invitado ya abrió el sobre, para no mostrárselo de nuevo.
// Si el navegador no deja guardar (modo privado, por ejemplo), el sobre se vuelve a mostrar.

function key(inviteToken: string) {
  return `wedshare:opened:${inviteToken}`;
}

export function wasOpened(inviteToken: string) {
  try {
    return localStorage.getItem(key(inviteToken)) === '1';
  } catch {
    return false;
  }
}

export function markOpened(inviteToken: string) {
  try {
    localStorage.setItem(key(inviteToken), '1');
  } catch {
    // Sin almacenamiento, la próxima vez se ve el sobre otra vez.
  }
}
