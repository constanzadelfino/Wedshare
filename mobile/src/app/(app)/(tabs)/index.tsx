import { router } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { Button } from '../../../components/Button';
import { FormError } from '../../../components/FormError';
import { Logo } from '../../../components/Logo';
import { QuickAction, quickActionIconProps } from '../../../components/QuickAction';
import { Screen } from '../../../components/Screen';
import { GuestCounts, useHome } from '../../../controllers/useHome';
import { useSignOut } from '../../../controllers/useSignOut';
import { colors } from '../../../theme/colors';
import { fonts, text } from '../../../theme/typography';
import { isoDateToLongDisplay } from '../../../utils/date';

// Inicio (pantalla 03 del diseño): cuenta regresiva, confirmaciones y accesos rápidos.
export default function InicioScreen() {
  const home = useHome();
  const signOut = useSignOut();

  return (
    <Screen
      topSpacing={64}
      gap={16}
      footer={
        <View style={styles.footer}>
          <FormError message={signOut.error} />
          {/* No está en el diseño: va acá hasta que exista la pantalla de Perfil. */}
          <Pressable
            onPress={signOut.handleSignOut}
            disabled={signOut.loading}
            accessibilityRole="button"
            style={styles.signOut}
          >
            {signOut.loading ? (
              <ActivityIndicator color={colors.accent} />
            ) : (
              <Text style={text.link}>Cerrar sesión</Text>
            )}
          </Pressable>
        </View>
      }
    >
      {home.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : home.error ? (
        <FormError message={home.error} />
      ) : !home.event ? (
        <>
          <Header title="Tu casamiento" />
          <Text style={text.body}>
            Todavía no creaste tu evento. Empezá por cargar el nombre, la fecha y el lugar.
          </Text>
          <Button title="Crear evento" onPress={() => router.push('/crear-evento')} />
        </>
      ) : (
        <>
          <Header
            title={home.event.coupleNames ?? home.event.name}
            subtitle={`${isoDateToLongDisplay(home.event.date)} · ${home.event.venue}`}
          />
          {home.daysLeft !== null && home.daysLeft >= 0 ? <Countdown days={home.daysLeft} /> : null}
          {home.counts ? <Counts counts={home.counts} /> : null}

          <View style={styles.actions}>
            <QuickAction
              title="Escanear ingreso"
              description="Validá el QR de cada invitado"
              icon={
                <Svg {...quickActionIconProps}>
                  <Rect x={3} y={3} width={7} height={7} />
                  <Rect x={14} y={3} width={7} height={7} />
                  <Rect x={3} y={14} width={7} height={7} />
                  <Path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
                </Svg>
              }
              onPress={() => router.push('/escanear')}
            />
            {/* No está en el diseño: hoy es la única forma de llegar a Personalizar. */}
            <QuickAction
              title="Personalizar invitación"
              description="Portada, fotos y eventos"
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M12 20h9" />
                  <Path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                </Svg>
              }
              onPress={() => router.push('/personalizar')}
            />
            <QuickAction
              title="Playlist del DJ"
              description="Canciones sugeridas por los invitados"
              comingSoon
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M9 18V5l12-2v13" />
                  <Circle cx={6} cy={18} r={3} />
                  <Circle cx={18} cy={16} r={3} />
                </Svg>
              }
            />
            <QuickAction
              title="Lista de regalos"
              description="Regalos y contribuciones"
              onPress={() => router.push('/regalos')}
              icon={
                <Svg {...quickActionIconProps}>
                  <Rect x={3} y={8} width={18} height={4} />
                  <Path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
                </Svg>
              }
            />
          </View>
        </>
      )}
    </Screen>
  );
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTexts}>
        <Text style={styles.kicker}>Tu casamiento</Text>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Logo width={34} />
    </View>
  );
}

function Countdown({ days }: { days: number }) {
  if (days === 0) {
    return (
      <View style={styles.countdown}>
        <Text style={styles.countdownLabel}>Hoy es el gran día</Text>
      </View>
    );
  }
  return (
    <View
      style={styles.countdown}
      accessible
      accessibilityLabel={days === 1 ? 'Falta 1 día' : `Faltan ${days} días`}
    >
      <Text style={styles.countdownLabel}>{days === 1 ? 'Falta' : 'Faltan'}</Text>
      <View style={styles.countdownValue}>
        <Text style={styles.countdownNumber}>{days}</Text>
        <Text style={styles.countdownUnit}>{days === 1 ? 'día' : 'días'}</Text>
      </View>
    </View>
  );
}

function Counts({ counts }: { counts: GuestCounts }) {
  // No está en el diseño: una línea chica con los que no asisten y el total de personas.
  const summary =
    counts.total === 0
      ? 'Todavía no agregaste invitados.'
      : [
          counts.declined > 0 ? `${counts.declined} no ${counts.declined === 1 ? 'asiste' : 'asisten'}` : null,
          `${counts.total} ${counts.total === 1 ? 'invitado' : 'invitados'} en total`,
        ]
          .filter(Boolean)
          .join(' · ');

  return (
    <View style={styles.counts}>
      <View style={styles.stats}>
        <Stat label="Confirmados" value={counts.confirmed} />
        <Stat label="Pendientes" value={counts.pending} />
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerTexts: {
    flex: 1,
    gap: 4,
  },
  kicker: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 2.34,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 38,
    lineHeight: 40,
    letterSpacing: -0.76,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.textSecondary,
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 96,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: colors.darkBrown,
    borderRadius: 18,
  },
  countdownLabel: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    letterSpacing: 1.96,
    textTransform: 'uppercase',
    color: colors.countdownText,
  },
  countdownValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  countdownNumber: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 56,
    lineHeight: 60,
    color: colors.lightGold,
  },
  countdownUnit: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.countdownText,
  },
  counts: {
    gap: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flex: 1,
    gap: 4,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  statValue: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38,
    color: colors.accent,
  },
  summary: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 4,
  },
  actions: {
    gap: 10,
  },
  footer: {
    alignItems: 'center',
    gap: 8,
  },
  signOut: {
    minHeight: 44,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
