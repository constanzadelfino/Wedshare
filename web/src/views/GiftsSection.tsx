import { useState } from 'react';

import { GiftTypeIcon } from '../components/GiftTypeIcon';
import { InvitationGifts } from '../models/Invitation';
import { GiftsDialog } from './GiftsDialog';

// Regalos, en versión discreta (pedido de Constanza): una tarjeta chica con un botón.
// La cuenta, el buzón y las ideas se ven recién al tocarlo, en un panel.
export function GiftsSection({ gifts }: { gifts: InvitationGifts }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="regalos" className="sec">
      <div className="wrap max-w-[560px]">
        <div className="card flex flex-col items-center gap-3 px-6 py-9 text-center">
          <span className="text-gold">
            <GiftTypeIcon type="other" size={44} />
          </span>
          <div className="eyebrow m-0 text-accent">Regalos</div>
          <p className="m-0 max-w-[420px] text-[16px] leading-[1.6] text-muted">
            Nuestro mejor regalo es que nos acompañes en este día. Si además querés hacernos un
            regalo, te dejamos algunas opciones.
          </p>
          <button type="button" className="btn btn-outline mt-2" onClick={() => setOpen(true)}>
            Ver opciones de regalo
          </button>
        </div>
      </div>
      {open && <GiftsDialog gifts={gifts} onClose={() => setOpen(false)} />}
    </section>
  );
}
