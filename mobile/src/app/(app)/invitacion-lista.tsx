import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { useInvitationPreview } from '../../controllers/useInvitationPreview';
import { useMyEvent } from '../../controllers/useMyEvent';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Cierre de los primeros pasos: la invitación ya existe. Invita a verla y lleva al Inicio.
export default function InvitacionListaScreen() {
  const { event } = useMyEvent();
  const preview = useInvitationPreview(event?.id);

  return (
    <Screen
      topSpacing={96}
      gap={14}
      footer={
        <View style={styles.footer}>
          <FormError message={preview.error} />
          <Button
            title="Ver mi invitación"
            loading={preview.opening}
            disabled={!event}
            onPress={() => preview.openPreview()}
          />
          <Pressable onPress={() => router.replace('/')} accessibilityRole="button" style={styles.home}>
            <Text style={text.link}>Ir al inicio</Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.check}>
        <Svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.card} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M5 12l5 5L20 7" />
        </Svg>
      </View>
      <Text style={styles.title} accessibilityRole="header">
        Tu invitación está lista
      </Text>
      <Text style={[text.body, styles.center]}>
        Mirá cómo la ven tus invitados. Después sumá fotos, su historia y los regalos desde la pestaña
        Invitación, y cargá a tus invitados para mandarles el link.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  check: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.text,
    textAlign: 'center',
    marginTop: 12,
  },
  center: {
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    gap: 10,
  },
  home: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
