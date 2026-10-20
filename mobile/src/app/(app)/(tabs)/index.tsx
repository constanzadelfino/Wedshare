import { Redirect, router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useCallback, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { Button } from '../../../components/Button';
import { FormError } from '../../../components/FormError';
import { Logo } from '../../../components/Logo';
import { QuickAction, quickActionIconProps } from '../../../components/QuickAction';
import { Screen } from '../../../components/Screen';
import { useShouldStartFirstSteps } from '../../../controllers/useFirstSteps';
import { GuestCounts, useHome } from '../../../controllers/useHome';
import { useInvitationPreview } from '../../../controllers/useInvitationPreview';
import { Event } from '../../../models/Event';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/typography';
import { isoDateToLongDisplay } from '../../../utils/date';

// Foto de arriba del Inicio: "A table set for a formal dinner with place settings", de Silvia Mara
// (unsplash.com/photos/MuZ9XVsH8yA), con la licencia de Unsplash. Elegida por Constanza: sin
// personas y en los tonos de la app, así el Inicio se ve lindo aunque no hayan subido fotos.
const HOME_PHOTO = require('../../../../assets/images/inicio-mesa.jpg');

// Inicio (pantalla 03 del diseño): foto con los nombres, cuenta regresiva, confirmaciones,
// accesos a Playlist e Historia y álbum con su estado, y accesos rápidos.
export default function InicioScreen() {
  const home = useHome();
  const startFirstSteps = useShouldStartFirstSteps();
  const preview = useInvitationPreview(home.event?.id);
  const hasEvent = !home.loading && !home.error && !!home.event;

  // Sobre la foto, la hora y la batería van en blanco; en las demás pestañas, en oscuro.
  const [focused, setFocused] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  return (
    <Screen topSpacing={64} gap={16} fullBleedTop={hasEvent}>
      <StatusBar style={focused && hasEvent ? 'light' : 'dark'} />
      {home.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : home.error ? (
        <FormError message={home.error} />
      ) : !home.event ? (
        // Sin casamiento todavía (por ejemplo, recién registrados): los primeros pasos, o una
        // tarjeta para retomarlos si los dejaron para más tarde.
        startFirstSteps ? (
          <Redirect href="/primeros-pasos" />
        ) : (
          <>
            <Header title="Tu casamiento" />
            <View style={styles.startCard}>
              <Text style={styles.startTitle}>Armá tu invitación</Text>
              <Text style={styles.startText}>
                Contanos sus nombres, la fecha y el lugar, y elegí una plantilla. Son unos pocos
                pasos.
              </Text>
              <Button title="Empezar" onPress={() => router.push('/primeros-pasos')} />
            </View>
          </>
        )
      ) : (
        <>
          <Hero
            title={home.event.coupleNames ?? home.event.name}
            subtitle={`${isoDateToLongDisplay(home.event.date)} · ${home.event.venue}`}
          />
          {home.daysLeft !== null && home.daysLeft >= 0 ? <Countdown days={home.daysLeft} /> : null}
          {home.counts ? <Counts counts={home.counts} /> : null}

          {/* No está en el diseño (pedido de Constanza): las funciones de la invitación a la
              vista, con cómo está cada una. Regalos tiene su propia pestaña. */}
          <View style={styles.features}>
            <Text style={styles.sectionLabel}>Tu invitación</Text>
            <View style={styles.tiles}>
              <FeatureTile
                title="Playlist"
                status={playlistStatus(home.event)}
                onPress={() => router.push('/playlist')}
                icon={
                  <Svg {...quickActionIconProps}>
                    <Path d="M9 18V5l12-2v13" />
                    <Circle cx={6} cy={18} r={3} />
                    <Circle cx={18} cy={16} r={3} />
                  </Svg>
                }
              />
              <FeatureTile
                title="Historia y álbum"
                status={storyStatus(home.event)}
                onPress={() => router.push('/historia')}
                icon={
                  <Svg {...quickActionIconProps}>
                    <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </Svg>
                }
              />
            </View>
          </View>

          <View style={styles.actions}>
            {/* No está en el diseño: la vista previa, también a mano desde la pestaña Invitación. */}
            <QuickAction
              title="Ver mi invitación"
              description="Así la ven tus invitados"
              onPress={() => preview.openPreview()}
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <Circle cx={12} cy={12} r={3} />
                </Svg>
              }
            />
            <FormError message={preview.error} />
            {/* El escáner ya no tiene pestaña: se abre desde acá. */}
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

// Foto ancha arriba de todo con los nombres, la fecha y el lugar encima. Una sombra color
// cacao abajo hace que el texto se lea, y otra suave arriba, la hora y la batería.
function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.hero, { height: 270 + insets.top }]}>
      <Image source={HOME_PHOTO} style={styles.heroPhoto} resizeMode="cover" accessibilityIgnoresInvertColors />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="heroShade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.darkBrown} stopOpacity={0.45} />
            <Stop offset="0.3" stopColor={colors.darkBrown} stopOpacity={0} />
            <Stop offset="0.4" stopColor={colors.darkBrown} stopOpacity={0} />
            <Stop offset="1" stopColor={colors.darkBrown} stopOpacity={0.9} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#heroShade)" />
      </Svg>
      <View style={styles.heroTexts}>
        <Text style={[styles.kicker, styles.heroKicker]}>Tu casamiento</Text>
        <Text style={[styles.title, styles.heroTitle]} accessibilityRole="header">
          {title}
        </Text>
        <Text style={[styles.subtitle, styles.heroSubtitle]}>{subtitle}</Text>
      </View>
    </View>
  );
}

function playlistStatus(event: Event): string {
  if (!event.spotifyPlaylistUrl) {
    return 'Sin conectar todavía';
  }
  return event.playlistEnabled ? 'Conectada a Spotify' : 'Oculta en la invitación';
}

function storyStatus(event: Event): string {
  const photos = event.albumPhotoUrls.length;
  if (photos > 0) {
    return photos === 1 ? '1 foto en el álbum' : `${photos} fotos en el álbum`;
  }
  if (event.storyText || event.storyPhotoUrl) {
    return 'Historia cargada';
  }
  return 'Sin cargar todavía';
}

function FeatureTile({
  title,
  status,
  icon,
  onPress,
}: {
  title: string;
  status: string;
  icon: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={status}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.tileIcon}>{icon}</View>
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileStatus}>{status}</Text>
    </Pressable>
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
  hero: {
    // Llega de borde a borde, por encima del margen de la pantalla.
    marginHorizontal: -24,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: colors.darkBrown,
  },
  heroPhoto: {
    // En Android la foto toma su tamaño en píxeles si no se le da uno: se ve gigante y borrosa.
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroTexts: {
    gap: 4,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  heroKicker: {
    color: colors.lightGold,
  },
  heroTitle: {
    color: colors.card,
  },
  heroSubtitle: {
    color: colors.countdownText,
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 72,
    paddingVertical: 12,
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
    fontSize: 42,
    lineHeight: 48,
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
  features: {
    gap: 10,
    marginTop: 4,
  },
  sectionLabel: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 2.34,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  tiles: {
    flexDirection: 'row',
    gap: 12,
  },
  tile: {
    flex: 1,
    gap: 6,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  tileIcon: {
    width: 44,
    height: 44,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.iconBackground,
  },
  tileTitle: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  tileStatus: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  pressed: {
    opacity: 0.85,
  },
  actions: {
    gap: 10,
  },
  startCard: {
    gap: 12,
    padding: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
  },
  startTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 20,
    color: colors.text,
  },
  startText: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});
