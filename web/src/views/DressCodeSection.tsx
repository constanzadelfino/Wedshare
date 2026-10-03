import { StarIcon } from '../components/Icons';

// Colores de la plantilla que acompañan al dress code, como en el diseño.
const SWATCHES = ['bg-gold', 'bg-bg', 'bg-accent', 'bg-dark'];

export function DressCodeSection({ dressCode }: { dressCode: string }) {
  return (
    <section id="dress" className="sec">
      <div className="wrap max-w-[640px] text-center">
        <div className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[1.5px] border-gold text-accent">
          <StarIcon />
        </div>
        <div className="eyebrow text-accent">Dress code</div>
        <p className="m-0 mb-3 font-display text-[38px] font-normal">{dressCode}</p>
        <div className="flex justify-center gap-2.5" aria-hidden="true">
          {SWATCHES.map((color) => (
            <span key={color} className={`block h-[34px] w-[34px] rounded-full border border-line ${color}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
