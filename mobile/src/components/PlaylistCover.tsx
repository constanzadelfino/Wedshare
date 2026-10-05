import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../theme/typography';
import { coupleInitials, splitCoupleNames } from '../utils/names';

type Props = {
  coupleNames: string;
  // Formato AAAA-MM-DD.
  date: string;
  size: number;
};

// Colores de la portada (diseño A elegido por Constanza: crema con marco dorado). Son los de la
// plantilla Dorado clásico; Spotify toma de acá el color del reproductor de la invitación.
const COVER = {
  background: '#F3EADB',
  gold: '#C9A45C',
  ink: '#2A1F14',
  accent: '#7A5B22',
} as const;

// Portada cuadrada para la playlist de Spotify: las iniciales de los novios (como el sello del
// sobre), sus nombres, "Nuestra playlist" y la fecha. Todo se dibuja en proporción al tamaño, así
// la misma vista sirve para mostrarla chica y para guardarla grande como imagen.
export const PlaylistCover = forwardRef<View, Props>(function PlaylistCover({ coupleNames, date, size }, ref) {
  const unit = size / 300;
  const initials = coupleInitials(coupleNames);
  const names = splitCoupleNames(coupleNames).join(' y ');
  const [year, month, day] = date.split('-');

  return (
    <View
      ref={ref}
      collapsable={false}
      accessible
      accessibilityLabel={`Portada de la playlist: ${names}`}
      style={[styles.cover, { width: size, height: size }]}
    >
      <View style={[styles.frame, { top: 16 * unit, left: 16 * unit, right: 16 * unit, bottom: 16 * unit, borderWidth: 1.5 * unit }]} />
      <View style={[styles.frame, styles.innerFrame, { top: 24 * unit, left: 24 * unit, right: 24 * unit, bottom: 24 * unit, borderWidth: unit }]} />

      <View style={[styles.initials, { gap: 14 * unit, marginBottom: 10 * unit }]}>
        <Text style={[styles.initial, { fontSize: 78 * unit, lineHeight: 86 * unit }]}>{initials[0]}</Text>
        {initials[1] ? (
          <>
            <View style={[styles.line, { width: unit, height: 64 * unit }]} />
            <Text style={[styles.and, { fontSize: 22 * unit }]}>&amp;</Text>
            <View style={[styles.line, { width: unit, height: 64 * unit }]} />
            <Text style={[styles.initial, { fontSize: 78 * unit, lineHeight: 86 * unit }]}>{initials[1]}</Text>
          </>
        ) : null}
      </View>
      <Text style={[styles.names, { fontSize: 13 * unit, letterSpacing: 3.1 * unit, marginBottom: 14 * unit }]} numberOfLines={1}>
        {names}
      </Text>
      <Text style={[styles.label, { fontSize: 11 * unit, letterSpacing: 3.7 * unit }]}>Nuestra playlist</Text>
      <Text style={[styles.date, { fontSize: 12 * unit, letterSpacing: 2.9 * unit, marginTop: 8 * unit }]}>
        {`${day} · ${month} · ${year}`}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COVER.background,
    overflow: 'hidden',
  },
  frame: {
    position: 'absolute',
    borderColor: COVER.gold,
  },
  innerFrame: {
    opacity: 0.6,
  },
  initials: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initial: {
    fontFamily: fonts.light,
    fontStyle: 'normal',
    color: COVER.ink,
  },
  line: {
    backgroundColor: COVER.gold,
  },
  and: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    color: COVER.gold,
  },
  names: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    color: COVER.ink,
    maxWidth: '80%',
  },
  label: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    color: COVER.accent,
  },
  date: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    color: COVER.accent,
  },
});
