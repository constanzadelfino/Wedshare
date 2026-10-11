import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { INTRO_SLIDES, useIntro } from '../controllers/useIntro';
import { colors } from '../theme/colors';
import { fonts, text } from '../theme/typography';
import { Button } from './Button';
import { IntroArt } from './IntroArt';

type Props = {
  intro: ReturnType<typeof useIntro>;
  // Arriba a la derecha hasta la última pantalla ("Saltear" o "Cerrar").
  skipLabel: string;
  onSkip: () => void;
  // Los botones de la última pantalla.
  children: ReactNode;
};

// Las cuatro pantallas de la presentación de la app, con los puntitos y "Siguiente".
// Se usa al abrir la app por primera vez (Bienvenida) y desde Perfil (Ver la presentación).
export function IntroPager({ intro, skipLabel, onSkip, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12, paddingBottom: Math.max(28, insets.bottom + 12) }]}>
      <View style={styles.top}>
        {!intro.isLast ? (
          <Pressable onPress={onSkip} accessibilityRole="button" style={styles.skip}>
            <Text style={text.link}>{skipLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        ref={intro.scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={intro.onScrollEnd}
        style={styles.pager}
      >
        {INTRO_SLIDES.map((slide, index) => (
          <View key={slide.title} style={[styles.slide, { width: intro.width }]}>
            <IntroArt index={index} />
            <Text style={styles.title} accessibilityRole="header">
              {slide.title}
            </Text>
            <Text style={text.body}>{slide.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <View
          style={styles.dots}
          accessible
          accessibilityLabel={`Pantalla ${intro.index + 1} de ${INTRO_SLIDES.length}`}
        >
          {INTRO_SLIDES.map((slide, index) => (
            <View key={slide.title} style={[styles.dot, index === intro.index && styles.dotActive]} />
          ))}
        </View>
        {intro.isLast ? children : <Button title="Siguiente" variant="outline" onPress={intro.next} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  skip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  pager: {
    flex: 1,
  },
  slide: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 12,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.text,
    marginTop: 16,
  },
  bottom: {
    paddingHorizontal: 24,
    gap: 14,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.accent,
  },
});
