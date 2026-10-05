// Botón flotante para pausar o reanudar la música de fondo.
export function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Pausar la música' : 'Reproducir la música'}
      aria-pressed={playing}
      className="fixed right-4 bottom-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold bg-card text-accent shadow-card"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {playing ? (
          <path d="M9 5v14M15 5v14" />
        ) : (
          <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </>
        )}
      </svg>
    </button>
  );
}
