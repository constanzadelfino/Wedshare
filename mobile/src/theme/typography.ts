import { TextStyle } from 'react-native';

import { colors } from './colors';

// Con fuentes propias, el peso se elige por familia y no con fontWeight.
export const fonts = {
  regular: 'Figtree_400Regular',
  medium: 'Figtree_500Medium',
  semiBold: 'Figtree_600SemiBold',
  bold: 'Figtree_700Bold',
  extraBold: 'Figtree_800ExtraBold',
} as const;

// Nunca cursiva: todos los estilos fijan fontStyle en normal.
export const text = {
  body: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  label: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  link: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.accentText,
  },
  button: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
  },
  // Títulos de sección en mayúsculas espaciadas, como "Módulos opcionales".
  sectionLabel: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 1.56,
    textTransform: 'uppercase',
    color: colors.accentText,
  },
  screenTitle: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 26,
    lineHeight: 30,
    color: colors.text,
  },
} satisfies Record<string, TextStyle>;

export const radius = {
  control: 14,
} as const;
