import { ReactNode } from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { EventItemKind } from '../models/EventItem';

type Props = {
  kind: EventItemKind;
  color: string;
  size?: number;
};

// Ícono de cada parte del casamiento, en línea fina: copas brindando (festejo),
// dos anillos entrelazados (ceremonia) y un acta firmada (civil). Dibujos propios de Wedshare.
export function EventItemIcon({ kind, color, size = 26 }: Props) {
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
      {SHAPES[kind]}
    </Svg>
  );
}

const SHAPES: Record<EventItemKind, ReactNode> = {
  party: (
    <>
      <G rotation={-14} origin="7.5, 12">
        <Path d="M5.2 2.5h4.6l-.5 6.6a1.8 1.8 0 0 1-3.6 0z" />
        <Path d="M5.5 6h4" />
        <Path d="M7.5 10.9V19" />
        <Path d="M5.5 19h4" />
      </G>
      <G rotation={14} origin="16.5, 12">
        <Path d="M14.2 2.5h4.6l-.5 6.6a1.8 1.8 0 0 1-3.6 0z" />
        <Path d="M14.5 6h4" />
        <Path d="M16.5 10.9V19" />
        <Path d="M14.5 19h4" />
      </G>
      <Path d="M12 1v1.5M10.3 1.8l.7 1M13.7 1.8l-.7 1" />
    </>
  ),
  ceremony: (
    <>
      <Circle cx={9} cy={13} r={6} />
      <Circle cx={15} cy={13} r={6} />
    </>
  ),
  civil: (
    <>
      <Path d="M6 2h9l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <Path d="M15 2v4h4" />
      <Path d="M8 9h7" />
      <Path d="M8 12.5h8" />
      <Path d="M8 18c.8-1.6 1.7-1.6 2.2 0s1.5 1.6 2.3 0 1.6-1.4 2.5 0" />
    </>
  ),
};
