import { HeartLogo } from '../components/HeartLogo';
import { useBodyScrollLock } from '../controllers/useBodyScrollLock';

type Props = {
  initials: string[];
  leaving: boolean;
  onOpen: () => void;
};

// Pantalla de apertura: un sobre con el sello de las iniciales y el botón "Abrir".
// La invitación ya está cargada debajo, así que al abrirse aparece sin esperas.
export function OpeningScreen({ initials, leaving, onOpen }: Props) {
  useBodyScrollLock();

  return (
    <div
      className={`fixed inset-0 z-50 h-dvh overflow-hidden bg-envelope text-ink ${leaving ? 'opening-leave' : ''}`}
    >
      <svg
        className="opening-flap absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 100,0 50,56" fill="rgba(46,36,24,0.10)" transform="translate(0 1.6)" />
        <polygon points="0,0 100,0 50,56" className="fill-card" />
        <polyline
          points="0,0 50,56 100,0"
          fill="none"
          className="stroke-line"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="absolute top-10 left-0 m-0 w-full text-center text-[12px] font-bold tracking-[0.32em] text-envelope-text uppercase">
        Una invitación para vos
      </p>

      <button
        type="button"
        onClick={onOpen}
        aria-label="Abrir la invitación"
        className="opening-seal absolute top-[56%] left-1/2 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-full border-0 bg-gold p-0 font-sans text-dark shadow-[inset_0_0_0_6px_var(--color-gold),inset_0_0_0_7px_rgba(255,253,248,0.65),0_12px_28px_rgba(0,0,0,0.22)]"
      >
        <Seal initials={initials} />
        <span className="text-[12px] font-bold tracking-[0.3em] uppercase">Abrir</span>
      </button>
    </div>
  );
}

function Seal({ initials }: { initials: string[] }) {
  if (initials.length === 0) {
    return <HeartLogo width={48} height={42} />;
  }
  return (
    <span className="flex items-center gap-1.5 font-display font-light tracking-[0.04em]">
      <span className="text-[44px] leading-none">{initials[0]}</span>
      {initials[1] && (
        <>
          <span className="flex flex-col items-center gap-0.5">
            <span className="h-3.5 w-px bg-dark" />
            <span className="text-[16px] leading-none">&amp;</span>
            <span className="h-3.5 w-px bg-dark" />
          </span>
          <span className="text-[44px] leading-none">{initials[1]}</span>
        </>
      )}
    </span>
  );
}
