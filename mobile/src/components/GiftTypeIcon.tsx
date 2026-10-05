import { ReactNode } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { GiftType } from '../models/Gift';

type Props = {
  type: GiftType;
  color: string;
  size?: number;
};

// Ícono de cada tipo de regalo, en línea fina. Los dibujos son de Lucide (lucide.dev,
// licencia ISC, de uso libre), el mismo estilo que los íconos del diseño.
export function GiftTypeIcon({ type, color, size = 26 }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SHAPES[type]}
    </Svg>
  );
}

const SHAPES: Record<GiftType, ReactNode> = {
  // Alcancía.
  savings: (
    <>
      <Path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
      <Path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <Path d="M16 11h.01" />
    </>
  ),
  // Avión.
  honeymoon: (
    <Path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  // Copa.
  experience: (
    <>
      <Path d="M8 22h8" />
      <Path d="M7 10h10" />
      <Path d="M12 15v7" />
      <Path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
    </>
  ),
  // Sillón.
  home: (
    <>
      <Path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <Path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
      <Path d="M4 18v2" />
      <Path d="M20 18v2" />
      <Path d="M12 4v9" />
    </>
  ),
  // Carita de bebé.
  baby: (
    <>
      <Path d="M9 12h.01" />
      <Path d="M15 12h.01" />
      <Path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <Path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </>
  ),
  // Paquete de regalo, el mismo del diseño.
  other: (
    <>
      <Rect x={3} y={8} width={18} height={4} />
      <Path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </>
  ),
};
