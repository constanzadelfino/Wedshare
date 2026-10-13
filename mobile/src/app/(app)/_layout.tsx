import { router, Stack } from 'expo-router';

import { useNotificationsSetup } from '../../controllers/useNotifications';
import { colors } from '../../theme/colors';

export default function AppLayout() {
  // Al tocar el aviso de "Familia Pérez respondió", se abre ese grupo.
  useNotificationsSetup((groupId) => router.push({ pathname: '/editar-grupo', params: { id: groupId } }));

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
