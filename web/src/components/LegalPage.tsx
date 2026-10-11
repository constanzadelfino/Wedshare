import { ReactNode, useEffect } from 'react';

import { HeartLogo } from './HeartLogo';

export const LEGAL_UPDATED = '11 de octubre de 2026';
export const CONTACT_EMAIL = 'wedshare.team@gmail.com';

type Props = {
  current: 'terminos' | 'privacidad';
  title: string;
  children: ReactNode;
};

const PAGES = [
  { id: 'terminos', label: 'Términos de uso', href: '/terminos' },
  { id: 'privacidad', label: 'Privacidad', href: '/privacidad' },
] as const;

// Marco de las páginas legales (/terminos y /privacidad): logo, pestañas para pasar de una a
// la otra, el título y el texto. Se abren desde Perfil en la app y Google pide que sean públicas.
export function LegalPage({ current, title, children }: Props) {
  useEffect(() => {
    document.title = `${title} · Wedshare`;
  }, [title]);

  return (
    <main className="min-h-dvh bg-bg px-4 pb-16 pt-8 text-ink">
      <div className="mx-auto max-w-[680px]">
        <header className="flex items-center gap-2 text-accent">
          <HeartLogo width={30} height={26} label="Wedshare" />
          <span className="text-[18px] font-bold tracking-tight text-ink">Wedshare</span>
        </header>

        <nav className="mt-6 flex gap-2" aria-label="Textos legales">
          {PAGES.map((page) => (
            <a
              key={page.id}
              href={page.href}
              aria-current={page.id === current ? 'page' : undefined}
              className={`flex min-h-11 items-center rounded-full border px-4 text-[15px] font-semibold no-underline ${
                page.id === current ? 'border-accent bg-accent text-card' : 'border-line bg-card text-accent'
              }`}
            >
              {page.label}
            </a>
          ))}
        </nav>

        <h1 className="mb-1 mt-8 text-[30px] font-extrabold leading-tight tracking-tight">{title}</h1>
        <p className="m-0 text-[14px] text-muted">Última actualización: {LEGAL_UPDATED}</p>

        <p className="mt-6 rounded-2xl border border-line bg-card p-4 text-[15px] leading-relaxed">
          Wedshare es el proyecto final de la carrera Analista de Sistemas de la Escuela Da Vinci, hecho por
          Constanza Delfino. Es gratuito y está en desarrollo.
        </p>

        <div className="legal-text mt-2">{children}</div>
      </div>
    </main>
  );
}

// Un apartado numerado del texto.
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-[19px] font-bold leading-snug">{title}</h2>
      {children}
    </section>
  );
}

export function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent underline">
      {CONTACT_EMAIL}
    </a>
  );
}
