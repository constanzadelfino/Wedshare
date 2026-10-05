import { router } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { GiftTypeIcon } from '../../components/GiftTypeIcon';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ToggleRow } from '../../components/ToggleRow';
import { useGifts } from '../../controllers/useGifts';
import { Gift, GIFT_METHOD_LABELS } from '../../models/Gift';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';
import { formatPrice } from '../../utils/money';
import { maskCbu } from '../../utils/validation';

// Regalos (pantalla 08 del diseño, simplificada con Constanza): si se muestran en la
// invitación, la lista de regalos, la cuenta para transferencias y el buzón.
export default function RegalosScreen() {
  const gifts = useGifts();
  const event = gifts.event;
  const hasBank = !!(event?.giftAlias || event?.giftCbu);

  return (
    <Screen topSpacing={56} gap={14}>
      <ScreenHeader title="Regalos" showLogo={false} />

      {gifts.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : gifts.loadError || !event ? (
        <FormError message={gifts.loadError} />
      ) : (
        <>
          <ToggleRow
            title="Mostrar en la invitación"
            subtitle={event.giftsEnabled ? 'Tus invitados ven tus regalos' : 'La sección está oculta'}
            value={event.giftsEnabled}
            onChange={gifts.setShowGifts}
          />
          <FormError message={gifts.error} />

          {gifts.gifts.length === 0 ? (
            <Text style={[text.body, styles.empty]}>
              Todavía no agregaste regalos. Pueden ser con link de pago, el link de un producto o
              por transferencia.
            </Text>
          ) : (
            <View style={styles.list}>
              {gifts.gifts.map((gift) => (
                <GiftRow key={gift.id} gift={gift} />
              ))}
            </View>
          )}
          <Button title="Agregar regalo" variant="outline" onPress={() => router.push('/editar-regalo')} />

          <Text style={[text.sectionLabel, styles.section]}>Cuenta para transferencias</Text>
          <Pressable
            onPress={() => router.push('/cuenta-bancaria')}
            accessibilityRole="button"
            accessibilityLabel={hasBank ? 'Editar la cuenta para transferencias' : 'Agregar cuenta bancaria'}
            style={({ pressed }) => [styles.giftRow, styles.bankRow, pressed && styles.pressed]}
          >
            <View style={styles.giftTexts}>
              {hasBank ? (
                <>
                  <Text style={styles.giftName}>{event.giftAlias ?? maskCbu(event.giftCbu ?? '')}</Text>
                  <Text style={styles.giftMethod}>
                    {[event.giftAlias && event.giftCbu ? maskCbu(event.giftCbu) : null, event.giftHolder]
                      .filter(Boolean)
                      .join(' · ') || 'La usan los regalos por transferencia'}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.addBank}>Agregar cuenta bancaria</Text>
                  <Text style={styles.giftMethod}>Para los regalos por transferencia</Text>
                </>
              )}
            </View>
            <View style={styles.chevron}>
              <Chevron />
            </View>
          </Pressable>

          <ToggleRow
            title="Buzón en el salón"
            subtitle="Para regalos en efectivo"
            value={event.giftMailbox}
            onChange={gifts.setMailbox}
          />
        </>
      )}
    </Screen>
  );
}

function Chevron() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

function GiftRow({ gift }: { gift: Gift }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/editar-regalo', params: { id: gift.id } })}
      accessibilityRole="button"
      accessibilityLabel={`Editar ${gift.name}`}
      style={({ pressed }) => [styles.giftRow, pressed && styles.pressed]}
    >
      <View style={styles.giftIcon}>
        <GiftTypeIcon type={gift.type} color={colors.textSecondary} />
      </View>
      <View style={styles.giftTexts}>
        <Text style={styles.giftName}>{gift.name}</Text>
        {gift.price ? <Text style={styles.giftPrice}>{formatPrice(gift.price)}</Text> : null}
        <View style={styles.giftMeta}>
          <Text style={styles.giftMethod}>{GIFT_METHOD_LABELS[gift.method]}</Text>
          {gift.given ? <Text style={styles.given}>Regalado</Text> : null}
        </View>
      </View>
      <View style={styles.chevron}>
        <Chevron />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
  },
  bankRow: {
    minHeight: 64,
    paddingLeft: 16,
  },
  addBank: {
    ...text.link,
    fontSize: 16,
  },
  empty: {
    paddingVertical: 8,
  },
  list: {
    gap: 10,
  },
  pressed: {
    opacity: 0.85,
  },
  giftRow: {
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
  giftIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.iconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftTexts: {
    flex: 1,
    gap: 1,
  },
  giftName: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  giftPrice: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.accentText,
  },
  giftMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  giftMethod: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.textSecondary,
  },
  given: {
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.confirmedBackground,
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 20,
    color: colors.confirmedText,
  },
  chevron: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
