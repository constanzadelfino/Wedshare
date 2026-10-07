import { Stack } from 'expo-router';

import { useShowIntro } from '../../controllers/useIntro';
import { colors } from '../../theme/colors';

export default function AuthLayout() {
  // La primera pantalla del grupo es la que se abre cuando no hay sesión: la presentación de la
  // app la primera vez, y Login después.
  const showIntro = useShowIntro();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {showIntro ? <Stack.Screen name="bienvenida" /> : null}
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="recuperar-contrasena" />
      {showIntro ? null : <Stack.Screen name="bienvenida" />}
    </Stack>
  );
}
