import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, useWindowDimensions } from 'react-native';

import { hasSeenIntro, markIntroSeen } from '../services/onboardingStorage';

export const INTRO_SLIDES = [
  {
    title: 'Armá tu invitación',
    text: 'Elegí una plantilla, sumá sus fotos y su historia, y la invitación queda lista para compartir.',
  },
  {
    title: 'Compartila por WhatsApp',
    text: 'Cada familia recibe su propio link. La abren desde el celular, sin instalar nada ni crear una cuenta.',
  },
  {
    title: 'Seguí las respuestas',
    text: 'Ves quién confirmó y quién todavía no respondió, con la preferencia alimentaria de cada persona.',
  },
  {
    title: 'Recibilos con un QR',
    text: 'Cada grupo tiene su pase de ingreso. El día del casamiento lo escaneás en la puerta.',
  },
] as const;

// Lógica de la presentación de la app: en qué pantalla está, pasar a la siguiente y terminar.
// Al terminar (o saltearla) se recuerda, para no mostrarla de nuevo.
export function useIntro() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === INTRO_SLIDES.length - 1;

  function onScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  }

  function next() {
    const nextIndex = Math.min(index + 1, INTRO_SLIDES.length - 1);
    scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    setIndex(nextIndex);
  }

  function finish(target: '/login' | '/registro') {
    markIntroSeen();
    router.replace(target);
  }

  return { width, scrollRef, index, isLast, onScrollEnd, next, finish };
}

// Si hay que mostrar la presentación: solo hasta que se vio (o se salteó) una vez.
export function useShowIntro() {
  return useState(() => !hasSeenIntro())[0];
}
