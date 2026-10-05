import { useEffect, useState } from 'react';

import { SectionTitle } from '../components/SectionTitle';
import { useBodyScrollLock } from '../controllers/useBodyScrollLock';

// Proporciones de la grilla del diseño: se alternan fotos altas (4:5) y cuadradas.
const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-square', 'aspect-[4/5]'];

// Álbum de fotos (hasta 8). Al tocar una foto se ve en grande.
export function AlbumSection({ photoUrls }: { photoUrls: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="album" className="sec bg-soft">
      <div className="wrap">
        <SectionTitle eyebrow="Momentos únicos" title="Álbum de fotos" />
        <div className="h-5" />
        <div className="grid grid-cols-2 items-start gap-2.5 md:grid-cols-3">
          {photoUrls.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ver la foto ${index + 1} en grande`}
              className={`block w-full cursor-zoom-in overflow-hidden rounded-[14px] border border-line bg-bg p-0 ${ASPECTS[index % ASPECTS.length]}`}
            >
              <img src={url} alt="" loading="lazy" className="block h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      {openIndex !== null && (
        <PhotoViewer url={photoUrls[openIndex]} index={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}

function PhotoViewer({ url, index, onClose }: { url: string; index: number; onClose: () => void }) {
  useBodyScrollLock();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} del álbum`}
      className="fixed inset-0 z-40 flex items-center justify-center bg-dark/90 p-4"
      onClick={onClose}
    >
      <img src={url} alt={`Foto ${index + 1} del álbum`} className="max-h-full max-w-full rounded-[14px] object-contain" />
      <button
        type="button"
        onClick={onClose}
        className="btn absolute top-4 right-4 min-h-11 border-0 bg-bg/90 px-5 text-ink"
      >
        Cerrar
      </button>
    </div>
  );
}
