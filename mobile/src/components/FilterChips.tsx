import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

// Fila de botones redondeados para filtrar, con desplazamiento horizontal.
// La activa va en dorado, como "Todos" en el diseño de Invitados.
export function FilterChips<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={({ pressed }) => [
              styles.chip,
              selected ? styles.chipSelected : styles.chipIdle,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.label, { color: selected ? colors.card : colors.text }]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Llega hasta el borde derecho de la pantalla, como en el diseño.
  scroll: {
    marginRight: -24,
  },
  content: {
    gap: 8,
    paddingRight: 24,
  },
  chip: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.accent,
  },
  chipIdle: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 14,
  },
});
