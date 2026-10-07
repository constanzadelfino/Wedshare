import { Ornament } from '../components/Ornament';

// Mensaje de bienvenida de los novios, entre comillas.
export function WelcomeSection({ message }: { message: string }) {
  return (
    <section className="sec pb-6">
      <div className="wrap tpl-align max-w-[720px]">
        <Ornament />
        <p className="mt-7 mb-3 font-display text-[24px] leading-[1.5] font-light whitespace-pre-line">
          “{message}”
        </p>
      </div>
    </section>
  );
}
