import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Dibujos de la presentación de la app, uno por pantalla, con la paleta de la app. Son
// decorativos: el título y el texto de cada pantalla ya dicen lo mismo.
export function IntroArt({ index }: { index: number }) {
  return (
    <View style={styles.box} accessibilityElementsHidden importantForAccessibility="no">
      {index === 0 && <InvitationArt />}
      {index === 1 && <WhatsAppArt />}
      {index === 2 && <AnswersArt />}
      {index === 3 && <PassArt />}
    </View>
  );
}

// Una invitación de Dorado clásico: nombres, tres fotos en arco y para quién es.
function InvitationArt() {
  return (
    <View style={styles.invitation}>
      <View style={[styles.bar, { width: 96, backgroundColor: colors.background }]} />
      <View style={[styles.bar, { width: 60, height: 3, marginTop: 6, backgroundColor: '#C9A45C' }]} />
      <View style={styles.arches}>
        <View style={[styles.arch, { width: 30, height: 42 }]} />
        <View style={[styles.arch, { width: 40, height: 56, backgroundColor: 'rgba(201,164,92,0.25)' }]} />
        <View style={[styles.arch, { width: 30, height: 42 }]} />
      </View>
      <View style={styles.pill} />
    </View>
  );
}

function WhatsAppArt() {
  return (
    <View style={styles.chat}>
      <View style={styles.bubble}>
        <Text style={styles.small}>¡Hola, Familia Pérez! Nos casamos y queremos que estén.</Text>
      </View>
      <View style={[styles.bubble, { borderColor: colors.accent }]}>
        <Text style={[styles.small, styles.strong, { color: colors.accent }]}>Invitación de Sofía y Martín</Text>
        <Text style={styles.small}>Tocá para abrirla</Text>
      </View>
      <View style={[styles.bubble, styles.reply]}>
        <Text style={styles.small}>¡Qué alegría! Ahí confirmamos.</Text>
      </View>
    </View>
  );
}

function AnswersArt() {
  return (
    <View style={styles.chat}>
      <View style={styles.statsRow}>
        <View style={[styles.bubble, styles.stat]}>
          <Text style={styles.small}>Confirmados</Text>
          <Text style={styles.statValue}>38</Text>
        </View>
        <View style={[styles.bubble, styles.stat]}>
          <Text style={styles.small}>Pendientes</Text>
          <Text style={styles.statValue}>74</Text>
        </View>
      </View>
      <GuestRow name="Familia Pérez" label="Confirmado" background={colors.confirmedBackground} color={colors.confirmedText} />
      <GuestRow name="Lucía Gómez" label="Pendiente" background={colors.pendingBackground} color={colors.pendingText} />
    </View>
  );
}

function GuestRow({ name, label, background, color }: { name: string; label: string; background: string; color: string }) {
  return (
    <View style={[styles.bubble, styles.guestRow]}>
      <Text style={[styles.small, styles.strong]}>{name}</Text>
      <View style={[styles.badge, { backgroundColor: background }]}>
        <Text style={[styles.badgeText, { color }]}>{label}</Text>
      </View>
    </View>
  );
}

// Un pase de ingreso con un QR de dibujo (no es un código real).
function PassArt() {
  return (
    <View style={styles.pass}>
      <Text style={styles.passTitle}>PASE DE INGRESO</Text>
      <Svg width={96} height={96} viewBox="0 0 21 21">
        <Path
          fill={colors.text}
          d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3zM0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2zM9 0h2v2H9zM9 3h1v3H9zM11 4h2v2h-2zM8 8h3v2H8zM12 8h2v1h-2zM15 9h3v2h-3zM19 8h2v3h-2zM9 12h2v2H9zM12 11h3v3h-3zM16 13h2v2h-2zM9 16h3v2H9zM13 16h2v5h-2zM16 17h5v2h-5zM19 20h2v1h-2zM0 9h3v2H0zM4 9h2v3H4z"
        />
      </Svg>
      <Text style={[styles.small, styles.strong]}>Válido para 4 personas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 260,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  invitation: {
    width: 150,
    height: 200,
    borderRadius: 14,
    backgroundColor: '#2A1F14',
    alignItems: 'center',
    paddingTop: 22,
  },
  bar: {
    height: 4,
    borderRadius: 2,
  },
  arches: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 18,
  },
  arch: {
    borderWidth: 1,
    borderColor: '#C9A45C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  pill: {
    width: 90,
    height: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C9A45C',
    marginTop: 16,
  },
  chat: {
    width: 230,
    gap: 8,
  },
  bubble: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    maxWidth: 200,
  },
  reply: {
    alignSelf: 'flex-end',
    backgroundColor: colors.confirmedBackground,
    borderColor: '#C9D6B0',
  },
  small: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: colors.text,
  },
  strong: {
    fontFamily: fonts.bold,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    maxWidth: undefined,
  },
  statValue: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 24,
    color: colors.accent,
  },
  guestRow: {
    alignSelf: 'stretch',
    maxWidth: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 10,
  },
  pass: {
    width: 160,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 10,
  },
  passTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.accent,
  },
});
