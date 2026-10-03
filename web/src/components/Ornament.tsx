import { HeartLogo } from './HeartLogo';

// Línea dorada con el corazón en el medio, que separa secciones.
export function Ornament() {
  return (
    <div className="mx-auto flex max-w-[320px] items-center justify-center gap-3.5 text-gold">
      <span className="h-px flex-1 bg-gold" />
      <HeartLogo />
      <span className="h-px flex-1 bg-gold" />
    </div>
  );
}
