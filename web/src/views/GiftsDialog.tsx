import { useEffect, useRef } from 'react';

import { BankDetails } from '../components/BankDetails';
import { GiftTypeIcon } from '../components/GiftTypeIcon';
import { useBodyScrollLock } from '../controllers/useBodyScrollLock';
import { GiftIdea, InvitationGifts } from '../models/Invitation';
import { formatPrice } from '../utils/money';

type Props = {
  gifts: InvitationGifts;
  onClose: () => void;
};

// Panel de regalos: la cuenta para transferir, el buzón y las ideas en filas compactas.
// Wedshare no maneja el dinero: "Regalar" abre el link que cargaron los novios; en las
// transferencias, lleva a la cuenta de arriba. Se cierra con el botón, tocando afuera o con Escape.
export function GiftsDialog({ gifts, onClose }: Props) {
  useBodyScrollLock();
  const { bank, mailbox, ideas } = gifts;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);

  // Solo al abrir: si no, cada vez que se redibuja (por ejemplo al copiar) volvería al título.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function showBank() {
    bankRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-dark/60 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gifts-title"
        className="flex max-h-[88dvh] w-full max-w-[480px] flex-col rounded-t-[22px] bg-card shadow-card sm:rounded-[22px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-y-auto px-6 pt-6 pb-4">
          <h2
            id="gifts-title"
            ref={titleRef}
            tabIndex={-1}
            className="m-0 mb-5 text-center font-display text-[26px] font-normal outline-none"
          >
            Opciones de regalo
          </h2>

          {bank && (
            <div ref={bankRef} className="mb-6 scroll-mt-4">
              <div className="eyebrow text-accent">Transferencia</div>
              <BankDetails bank={bank} />
            </div>
          )}

          {mailbox && (
            <div className="mb-6">
              <div className="eyebrow text-accent">Buzón en el salón</div>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">
                Si preferís regalarnos efectivo, vas a encontrar un buzón en el salón durante la recepción.
              </p>
            </div>
          )}

          {ideas.length > 0 && (
            <div>
              <div className="eyebrow text-accent">Ideas de regalos</div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {ideas.map((idea, index) => (
                  <IdeaRow key={index} idea={idea} hasBank={!!bank} onShowBank={showBank} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border-t border-line px-6 py-4">
          <button type="button" className="btn btn-solid w-full" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function IdeaRow({ idea, hasBank, onShowBank }: { idea: GiftIdea; hasBank: boolean; onShowBank: () => void }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line p-2.5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft text-gold">
        <GiftTypeIcon type={idea.type} size={26} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold">{idea.name}</span>
        {idea.price !== null && <span className="text-sm font-bold text-accent">{formatPrice(idea.price)}</span>}
      </span>
      {idea.given ? (
        <span className="shrink-0 px-2 text-sm font-semibold text-muted">Ya se lo regalaron</span>
      ) : idea.method === 'transfer' || !idea.url ? (
        <button
          type="button"
          className="btn btn-outline min-h-11 shrink-0 px-4 text-sm"
          disabled={!hasBank}
          onClick={onShowBank}
        >
          Ver cuenta
        </button>
      ) : (
        <a
          className="btn btn-solid min-h-11 shrink-0 px-4 text-sm"
          href={idea.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Regalar
        </a>
      )}
    </li>
  );
}
