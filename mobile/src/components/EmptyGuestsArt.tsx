import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../theme/colors';

// Dibujo de Invitados cuando todavía no hay ninguno: un sobre abierto con la invitación y un
// corazón, en línea fina dorada como el logo. Es decorativo: el título ya dice lo mismo.
export function EmptyGuestsArt() {
  return (
    <Svg
      width={190}
      height={150}
      viewBox="0 0 190 150"
      fill="none"
      stroke={colors.accent}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Circle cx={95} cy={80} r={62} fill="#EFE4CF" stroke="none" />
      <Rect x={45} y={58} width={100} height={66} rx={6} fill={colors.card} />
      <Path d="M45 64l50 34 50-34" />
      <Rect x={62} y={30} width={66} height={56} rx={4} fill={colors.card} />
      <Path d="M75 46h40M80 56h30M84 66h22" />
      <Path d="M45 124l38-30M145 124l-38-30" />
      <Rect x={45} y={58} width={100} height={66} rx={6} />
      <Path
        d="M95 105c-6-5-11-8-11-13a5 5 0 0 1 11-2 5 5 0 0 1 11 2c0 5-5 8-11 13z"
        fill={colors.lightGold}
      />
      <Path d="M28 40l3 3M31 40l-3 3M160 28v8M156 32h8M164 96l2 2M166 96l-2 2" strokeWidth={1.4} />
    </Svg>
  );
}
