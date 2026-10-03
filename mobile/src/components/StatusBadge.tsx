import { StyleSheet, Text } from 'react-native';

import { GuestStatus } from '../models/Guest';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const STATUS = {
  confirmed: { label: 'Confirmó', background: colors.confirmedBackground, color: colors.confirmedText },
  pending: { label: 'Pendiente', background: colors.pendingBackground, color: colors.pendingText },
  declined: { label: 'No asiste', background: colors.declinedBackground, color: colors.declinedText },
} as const;

// Etiqueta con la respuesta de un invitado: "Confirmó", "Pendiente" o "No asiste".
export function StatusBadge({ status }: { status: GuestStatus }) {
  const { label, background, color } = STATUS[status];
  return <Text style={[styles.badge, { backgroundColor: background, color }]}>{label}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    height: 28,
    lineHeight: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    overflow: 'hidden',
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
  },
});
