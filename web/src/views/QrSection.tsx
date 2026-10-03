import { ReactNode } from 'react';

import { DownloadIcon, LockIcon } from '../components/Icons';
import { SectionTitle } from '../components/SectionTitle';
import { useEntryPass } from '../controllers/useEntryPass';
import { Invitation } from '../models/Invitation';

type Props = {
  invitation: Invitation;
  onChangeAnswer: () => void;
};

function personas(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// QR de ingreso: bloqueado hasta confirmar; activo si alguien del grupo asiste;
// desactivado si el grupo avisó que nadie va.
export function QrSection({ invitation, onChangeAnswer }: Props) {
  const pass = useEntryPass(invitation);
  const { event, group } = invitation;
  const active = pass.entryCode !== null;
  const declined = group.rsvp !== null && !active;

  let intro = 'Tu pase aparece acá apenas confirmás tu asistencia.';
  if (active) {
    intro = 'Mostrá este código al llegar. Guardalo para usarlo aunque no tengas señal.';
  } else if (declined) {
    intro = 'Tu pase se desactivó porque avisaste que no vas a poder venir.';
  }

  return (
    <section id="qr" className="sec scroll-mt-4">
      <div className="wrap">
        <SectionTitle eyebrow="Tu acceso" title="Entrá sin hacer fila" />
        <p className="mx-auto mt-0 mb-7 max-w-[560px] text-center text-[17px] leading-[1.55] text-muted">{intro}</p>

        {/* La sombra va solo debajo del pase, así los costados de las medias lunas quedan limpios. */}
        <div className="mx-auto max-w-[340px] text-center">
          <div className="flex flex-col items-center gap-1.5 rounded-t-[22px] border border-b-0 border-line bg-card px-6 pt-[26px] pb-[22px]">
            <div className="eyebrow m-0 text-accent">Pase de ingreso</div>
            <div className="font-display text-[20px] font-semibold">{pass.title}</div>
            <div className="text-[14px] text-muted">{pass.subtitle}</div>
          </div>

          {/* Corte de entrada: línea punteada con dos medias lunas recortadas a los costados. */}
          <div className="ticket-notch relative h-6 border-x border-line bg-card" aria-hidden="true">
            <span className="absolute top-[11px] right-6 left-6 border-t-2 border-dashed border-line" />
          </div>

          <div className="flex flex-col items-center gap-3.5 rounded-b-[22px] border border-t-0 border-line bg-card shadow-[0_22px_30px_-18px_rgba(46,36,24,0.22)] px-6 pt-[22px] pb-[26px]">
            {active ? (
              <>
                <QrBox>
                  {pass.qrSvg && (
                    <div
                      role="img"
                      aria-label="Código QR de ingreso"
                      className="h-[190px] w-[190px] max-w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: pass.qrSvg }}
                    />
                  )}
                </QrBox>
                <div className="text-[19px] font-bold">Válido para {personas(pass.attendees.length)}</div>
                <div className="text-[14px] leading-[1.5] text-muted">{pass.attendees.join(', ')}</div>
                <button
                  type="button"
                  onClick={pass.saveImage}
                  disabled={pass.saving}
                  className="btn btn-solid w-full"
                >
                  <DownloadIcon />
                  {pass.saving ? 'Preparando…' : 'Guardar imagen'}
                </button>
                {pass.saveError && (
                  <p className="m-0 text-[14px] font-semibold text-[#9B2C2C]" role="alert">
                    {pass.saveError}
                  </p>
                )}
              </>
            ) : (
              <>
                <QrBox>
                  <LockedQr />
                </QrBox>
                <div className="text-[17px] font-bold">{declined ? 'Tu pase no está activo' : 'Tu QR te espera'}</div>
                <div className="text-[14px] leading-[1.5] text-muted">
                  {event.rsvpClosed
                    ? 'La confirmación ya cerró.'
                    : declined
                      ? 'Si tus planes cambian, cambiá tu respuesta y vuelve a aparecer.'
                      : 'Confirmá tu asistencia para ver tu pase de ingreso.'}
                </div>
                {!event.rsvpClosed &&
                  (declined ? (
                    <button type="button" onClick={onChangeAnswer} className="btn btn-solid w-full">
                      Cambiar mi respuesta
                    </button>
                  ) : (
                    <a href="#rsvp" className="btn btn-solid w-full">
                      Confirmar asistencia
                    </a>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QrBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex rounded-2xl border border-dashed border-line bg-white p-3.5">{children}</div>
  );
}

// QR de muestra, apagado y con un candado encima (como en el diseño).
function LockedQr() {
  return (
    <>
      <svg width="190" height="190" viewBox="0 0 25 25" className="block max-w-full" aria-hidden="true">
        {SAMPLE_CELLS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-ink" opacity="0.1" />
        ))}
      </svg>
      <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-gold bg-card text-accent">
        <LockIcon />
      </span>
    </>
  );
}

// Celdas de un QR cualquiera, solo como dibujo: no se puede escanear.
const SAMPLE_CELLS: [number, number][] = (() => {
  const cells: [number, number][] = [];
  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        if (edge || core) cells.push([ox + x, oy + y]);
      }
    }
  };
  finder(0, 0);
  finder(18, 0);
  finder(0, 18);
  // Relleno fijo (pseudoaleatorio) para el resto.
  let seed = 7;
  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 25; x++) {
      const inFinder = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      seed = (seed * 1103515245 + 12345) % 2147483648;
      if (!inFinder && seed % 100 < 45) cells.push([x, y]);
    }
  }
  return cells;
})();
