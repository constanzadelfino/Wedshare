import { HeartLogo } from '../components/HeartLogo';

type Props = {
  title: string;
  message?: string;
  onRetry?: () => void;
};

// Pantalla simple para la carga y los errores (link inválido, sin conexión).
export function StatusScreen({ title, message, onRetry }: Props) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-5 text-center text-ink">
      <span className="text-gold">
        <HeartLogo width={40} height={35} />
      </span>
      <h1 className="m-0 text-[20px] font-semibold" role="status">
        {title}
      </h1>
      {message && <p className="m-0 max-w-[360px] text-[16px] leading-[1.55] text-muted">{message}</p>}
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-solid mt-2">
          Intentar de nuevo
        </button>
      )}
    </main>
  );
}
