import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  // Para funciones que todavía no existen: se ve "Próximamente" en lugar de la flecha.
  comingSoon?: boolean;
};

// Acceso rápido del Inicio, como "Escanear ingreso".
export function QuickAction({ icon, title, description, onPress, comingSoon = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={comingSoon}
      accessibilityRole="button"
      accessibilityLabel={comingSoon ? `${title}, próximamente` : title}
      accessibilityHint={description}
      accessibilityState={{ disabled: comingSoon }}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={comingSoon && styles.dimmed}>{icon}</View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {comingSoon ? (
        <Text style={styles.soon}>Próximamente</Text>
      ) : (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M9 6l6 6-6 6" />
        </Svg>
      )}
    </Pressable>
  );
}

// Props comunes de los íconos de los accesos: 26 px, en línea dorada.
export const quickActionIconProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: colors.accent,
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 64,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  dimmed: {
    opacity: 0.5,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  soon: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.accentText,
  },
});
