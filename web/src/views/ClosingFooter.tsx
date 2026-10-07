import { HeartLogo } from '../components/HeartLogo';
import { NightStars } from '../components/TemplateDecor';
import { useTemplateId } from '../controllers/TemplateContext';
import { Ornament } from '../components/Ornament';

// Cierre de la invitación, con la frase final de los novios si la cargaron.
export function ClosingFooter({ phrase }: { phrase: string | null }) {
  const noche = useTemplateId() === 'noche';
  return (
    <footer className="relative overflow-hidden rounded-t-[44px] bg-dark pt-14 pb-9 text-bg">
      {noche && <NightStars />}
      <div className="wrap relative flex flex-col items-center gap-[18px] text-center">
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
      </div>
    </footer>
  );
}
