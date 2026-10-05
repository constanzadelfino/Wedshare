import type { ReactNode } from 'react';

import { EventItemKind } from '../models/Invitation';

// Ícono de cada parte del casamiento, en línea fina (los mismos que en la app): copas
// brindando (festejo), dos anillos entrelazados (ceremonia) y un acta firmada (civil). Dibujos propios.
// Toman el color del texto que los rodea.
export function EventItemIcon({ kind, size = 64 }: { kind: EventItemKind; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SHAPES[kind]}
    </svg>
  );
}

const SHAPES: Record<EventItemKind, ReactNode> = {
  party: (
    <>
      <g transform="rotate(-14 7.5 12)">
        <path d="M5.2 2.5h4.6l-.5 6.6a1.8 1.8 0 0 1-3.6 0z" />
        <path d="M5.5 6h4" />
        <path d="M7.5 10.9V19" />
        <path d="M5.5 19h4" />
      </g>
      <g transform="rotate(14 16.5 12)">
        <path d="M14.2 2.5h4.6l-.5 6.6a1.8 1.8 0 0 1-3.6 0z" />
        <path d="M14.5 6h4" />
        <path d="M16.5 10.9V19" />
        <path d="M14.5 19h4" />
      </g>
      <path d="M12 1v1.5M10.3 1.8l.7 1M13.7 1.8l-.7 1" />
    </>
  ),
  ceremony: (
    <>
      <circle cx="9" cy="13" r="6" />
      <circle cx="15" cy="13" r="6" />
    </>
  ),
  civil: (
    <>
      <path d="M6 2h9l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M15 2v4h4" />
      <path d="M8 9h7" />
      <path d="M8 12.5h8" />
      <path d="M8 18c.8-1.6 1.7-1.6 2.2 0s1.5 1.6 2.3 0 1.6-1.4 2.5 0" />
    </>
  ),
};
