import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  urls: string[];
  max: number;
  // Índice de la foto que se está subiendo o quitando.
  busyIndex: number | null;
  disabled: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  // Lugares por fila (por defecto, todos en una). El álbum usa 4.
  columns?: number;
  // Proporción de cada lugar (por defecto 3:4, como la portada).
  aspectRatio?: number;
};

// Los lugares para fotos (portada, historia o álbum): las que ya están, y uno para agregar
// la siguiente.
export function CoverPhotos({
  urls,
  max,
  busyIndex,
  disabled,
  onAdd,
  onRemove,
  columns = max,
  aspectRatio = 3 / 4,
}: Props) {
  const rows = Array.from({ length: Math.ceil(max / columns) }, (_, row) =>
    Array.from({ length: columns }, (_, column) => row * columns + column),
  );
  return (
    <View style={[styles.rows, disabled && styles.disabled]}>
      {rows.map((indexes, row) => (
        <View key={row} style={styles.row}>
          {indexes.map((index) => renderSlot(index))}
        </View>
      ))}
    </View>
  );

  function renderSlot(index: number) {
    // Si la última fila tiene lugares de más, quedan vacíos para que las demás no se estiren.
    if (index >= max) {
      return <View key={index} style={[styles.slot, { aspectRatio }]} />;
    }
    const url = urls[index];
    const busy = busyIndex === index;

    if (url) {
      return (
        <View key={index} style={[styles.slot, { aspectRatio }]}>
          <Image source={{ uri: url }} style={styles.image} accessibilityLabel={`Foto ${index + 1}`} />
          {busy ? (
            <View style={styles.overlay}>
              <ActivityIndicator color={colors.card} />
            </View>
          ) : (
            <Pressable
              onPress={() => onRemove(index)}
              disabled={disabled || busyIndex !== null}
              accessibilityRole="button"
              accessibilityLabel={`Quitar foto ${index + 1}`}
              hitSlop={8}
              style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
            >
              <Svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.card}
                strokeWidth={2.4}
                strokeLinecap="round"
              >
                <Path d="M18 6L6 18M6 6l12 12" />
              </Svg>
            </Pressable>
          )}
        </View>
      );
    }

    // Solo se puede agregar en el primer lugar libre, para que las fotos queden en orden.
    const isNext = index === urls.length;
    return (
      <Pressable
        key={index}
        onPress={onAdd}
        disabled={!isNext || disabled || busyIndex !== null}
        accessibilityRole="button"
        accessibilityLabel={`Subir foto ${index + 1}`}
        style={({ pressed }) => [
          styles.slot,
          { aspectRatio },
          styles.empty,
          !isNext && styles.waiting,
          pressed && styles.pressed,
        ]}
      >
        {busy ? (
          <ActivityIndicator color={colors.accent} />
        ) : (
          <>
            <Svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.accentText}
              strokeWidth={2}
              strokeLinecap="round"
            >
              <Path d="M12 5v14M5 12h14" />
            </Svg>
            {max > 1 ? (
              <Text style={styles.label}>Foto {index + 1}</Text>
            ) : (
              <Text style={styles.label}>Foto</Text>
            )}
          </>
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  rows: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  slot: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  empty: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.accent,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  waiting: {
    opacity: 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(46, 36, 24, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 36, 24, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.accentText,
  },
});
