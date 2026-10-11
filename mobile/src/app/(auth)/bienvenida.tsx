import { Pressable, StyleSheet, Text } from 'react-native';

import { Button } from '../../components/Button';
import { IntroPager } from '../../components/IntroPager';
import { useIntro } from '../../controllers/useIntro';
import { text } from '../../theme/typography';

// Presentación de la app (sin diseño propio, aprobada por Constanza en una muestra): cuatro
// pantallas que se deslizan, solo la primera vez que se abre la app. Se puede saltear.
export default function BienvenidaScreen() {
  const intro = useIntro();

  return (
    <IntroPager intro={intro} skipLabel="Saltear" onSkip={() => intro.finish('/login')}>
      <Button title="Crear mi cuenta" onPress={() => intro.finish('/registro')} />
      <Pressable onPress={() => intro.finish('/login')} accessibilityRole="button" style={styles.secondary}>
        <Text style={text.link}>Ya tengo cuenta</Text>
      </Pressable>
    </IntroPager>
  );
}

const styles = StyleSheet.create({
  secondary: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
