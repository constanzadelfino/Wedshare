import { HeartLogo } from '../components/HeartLogo';
import { Ornament } from '../components/Ornament';

// Cierre de la invitación. La frase final de los novios se suma cuando exista en la app.
export function ClosingFooter() {
  return (
    <footer className="rounded-t-[44px] bg-dark pt-14 pb-9 text-bg">
      <div className="wrap flex flex-col items-center gap-[18px] text-center">
        <Ornament />
        <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-mdark">
          Gracias por ser parte de este día tan especial.
        </p>
        <div className="mt-3 flex w-full max-w-[520px] flex-wrap items-center justify-center gap-4 border-t border-gold/40 pt-[22px]">
          <span className="flex items-center gap-2.5 text-gold">
            <HeartLogo width={32} height={28} label="Wedshare" />
            <span className="text-[18px] font-bold text-bg">Hecho con Wedshare</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
