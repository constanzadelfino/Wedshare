import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { EventItem } from '../models/EventItem';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { isoDateToShortDisplay } from '../utils/date';

// Tarjeta de un evento en Personalizar → Eventos: nombre, fecha y hora, y lugar. Al tocarla se edita.
export function EventItemCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Editar ${item.name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.texts}>
        <Text style={styles.name}>{item.name}</Text>
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
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.85,
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
