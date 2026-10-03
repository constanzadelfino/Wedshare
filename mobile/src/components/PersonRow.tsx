import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { radius } from '../theme/typography';
import { TextField } from './TextField';

type Props = {
  index: number;
  value: string;
  onChangeText: (value: string) => void;
  // Si no se pasa, no se muestra el botón para quitar (por ejemplo, cuando queda una sola persona).
  onRemove?: () => void;
};

// Campo "Persona N" con un botón para quitarla, en Agregar invitados y en la edición de un grupo.
export function PersonRow({ index, value, onChangeText, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <TextField
          label={`Persona ${index + 1}`}
          placeholder="Nombre y apellido"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="words"
          autoComplete="off"
        />
      </View>
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Quitar persona ${index + 1}`}
          style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 6L6 18M6 6l12 12" />
          </Svg>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  field: {
    flex: 1,
  },
  // Mismo alto que el campo (52 px) para que quede alineado.
  remove: {
    width: 52,
    height: 52,
    borderRadius: radius.control,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
