import { useTemplateId } from '../controllers/TemplateContext';
import { HeartLogo } from './HeartLogo';
import { DecoDivider } from './TemplateDecor';

// Separador de secciones, según la plantilla: línea con el corazón (Dorado y Rosa), línea con
// rombos art déco (Noche azul) o una línea fina sola (Minimalista).
export function Ornament() {
  const template = useTemplateId();

  if (template === 'noche') {
    return <DecoDivider />;
  }
  if (template === 'minimal') {
    return <span className="block h-px w-full bg-gold/50" />;
  }
  return (
    <div className="mx-auto flex max-w-[320px] items-center justify-center gap-3.5 text-gold">
      <span className="h-px flex-1 bg-gold" />
      <HeartLogo />
      <span className="h-px flex-1 bg-gold" />
    </div>
  );
}
