import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { EventItem, eventItemLabel } from '../models/EventItem';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { isoDateToShortDisplay } from '../utils/date';
import { EventItemIcon } from './EventItemIcon';

// Tarjeta de un evento en Personalizar → Eventos: ícono, tipo, fecha y hora, y lugar. Al tocarla se edita.
export function EventItemCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Editar ${eventItemLabel(item.kind)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <EventItemIcon kind={item.kind} color={colors.textSecondary} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.name}>{eventItemLabel(item.kind)}</Text>
        <Text style={styles.detail}>
          {isoDateToShortDisplay(item.date)} · {item.time} horas
        </Text>
        <Text style={styles.detail}>{item.venueName}</Text>
      </View>
      <View style={styles.chevron}>
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M9 18l6-6-6-6" />
        </Svg>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 76,
    paddingVertical: 10,
    paddingLeft: 10,
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
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 17,
    color: colors.text,
  },
  detail: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
  chevron: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
