import { useEffect, useRef, useState } from 'react';

// Tiempo que se muestra "Copiado" en el botón.
const COPIED_MS = 2000;

// Copia un texto al portapapeles y avisa por un rato que se copió.
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setFailed(false);
      setCopied(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      // Algunos navegadores no dejan copiar (por ejemplo, sin https): el número queda a la vista.
      setFailed(true);
    }
  }

  return { copied, failed, copy };
}
