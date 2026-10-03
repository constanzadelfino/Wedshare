import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Guest } from '../models/Guest';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { StatusBadge } from './StatusBadge';

type Props = {
  name: string;
  // Cantidad total de personas del grupo, aunque el filtro muestre menos.
  total: number;
  guests: Guest[];
  // false para alguien que va solo: se muestra solo su fila, sin repetir el nombre arriba.
  showHeader?: boolean;
  // Al tocar la tarjeta se abre el grupo (compartir el link, editar o borrar).
  onPress: () => void;
};

// Tarjeta de un grupo en la pantalla Invitados: nombre, cantidad y una fila por persona.
export function GuestGroupCard({ name, total, guests, showHeader = true, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {showHeader ? (
        <View style={styles.header}>
          <Text style={styles.name} accessibilityRole="header">
            {name}
          </Text>
          <Text style={styles.count}>
            {total} {total === 1 ? 'invitado' : 'invitados'}
          </Text>
        </View>
      ) : null}
      {guests.map((guest, index) => (
        <View
          key={guest.id}
          style={[styles.row, index < guests.length - 1 && styles.rowDivider]}
        >
          <View style={styles.avatar}>
            <Svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textSecondary}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <Circle cx={12} cy={7} r={4} />
            </Svg>
          </View>
          <Text style={styles.guestName}>{guest.name}</Text>
          <StatusBadge status={guest.status} />
        </View>
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  name: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 18,
    color: colors.text,
  },
  count: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestName: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
});
