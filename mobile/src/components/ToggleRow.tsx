import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

// Tarjeta con ícono, texto e interruptor, como "Google Calendar" o "Playlist del DJ".
// Toda la fila se puede tocar para cambiar el valor.
export function ToggleRow({ icon, title, subtitle, value, onChange }: Props) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityLabel={title}
      accessibilityHint={subtitle}
      accessibilityState={{ checked: value }}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.switchArea}>
        <View style={[styles.track, { backgroundColor: value ? colors.accent : colors.switchOff }]}>
          <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  switchArea: {
    width: 56,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
  },
  thumb: {
    position: 'absolute',
    top: 3,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.card,
  },
  thumbOn: {
    right: 3,
  },
  thumbOff: {
    left: 3,
  },
});
