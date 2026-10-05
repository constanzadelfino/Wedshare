import { HeartLogo } from '../components/HeartLogo';
import { Ornament } from '../components/Ornament';

// Cierre de la invitación, con la frase final de los novios si la cargaron.
export function ClosingFooter({
  phrase,
  music,
}: {
  phrase: string | null;
  music: { title: string; credit: string | null } | null;
}) {
  return (
    <footer className="rounded-t-[44px] bg-dark pt-14 pb-9 text-bg">
      <div className="wrap flex flex-col items-center gap-[18px] text-center">
        <Ornament />
        {phrase && (
          <p className="m-0 max-w-[480px] font-display text-[28px] leading-[1.35] font-normal text-bg">
            “{phrase}”
          </p>
        )}
        <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-mdark">
          Gracias por ser parte de este día tan especial.
        </p>
        <div className="mt-3 flex w-full max-w-[520px] flex-wrap items-center justify-center gap-4 border-t border-gold/40 pt-[22px]">
          <span className="flex items-center gap-2.5 text-gold">
            <HeartLogo width={32} height={28} label="Wedshare" />
            <span className="text-[18px] font-bold text-bg">Hecho con Wedshare</span>
          </span>
        </div>
        {/* Las licencias CC BY y CC BY-SA piden nombrar al intérprete. */}
        {music && (
          <p className="m-0 text-[12px] leading-[1.5] text-mdark">
            Música: {music.title}
            {music.credit ? ` · ${music.credit}` : ' · Dominio público'}
          </p>
        )}
      </div>
    </footer>
  );
}
