import { useEffect } from 'react';

// Mientras se ve una pantalla completa (el sobre, el agradecimiento), la página de abajo
// no se desplaza.
export function useBodyScrollLock() {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
}
