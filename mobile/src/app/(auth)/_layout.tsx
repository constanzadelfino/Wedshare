import { Stack } from 'expo-router';

import { colors } from '../../theme/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {/* Login va primero: es la pantalla que se abre cuando no hay sesión. */}
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="recuperar-contrasena" />
    </Stack>
  );
}
