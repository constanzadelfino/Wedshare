import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { FormError } from '../../../components/FormError';
import { Logo } from '../../../components/Logo';
import { Screen } from '../../../components/Screen';
import { useAuth } from '../../../context/AuthContext';
import { useSignOut } from '../../../controllers/useSignOut';
import { colors } from '../../../theme/colors';
import { fonts, text } from '../../../theme/typography';

// Perfil (falta diseñarlo): por ahora el nombre, el email y "Cerrar sesión".
export default function PerfilScreen() {
  const { user } = useAuth();
  const signOut = useSignOut();

  return (
    <Screen topSpacing={64} gap={16}>
      <View style={styles.header}>
        <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
          Perfil
        </Text>
        <Logo width={34} />
      </View>

      <View style={styles.card}>
        {user?.name ? <Text style={styles.name}>{user.name}</Text> : null}
        <Text style={text.body}>{user?.email}</Text>
      </View>

      <FormError message={signOut.error} />
      <Pressable
        onPress={signOut.handleSignOut}
        disabled={signOut.loading}
        accessibilityRole="button"
        style={({ pressed }) => [styles.signOut, pressed && styles.pressed]}
      >
        {signOut.loading ? (
          <ActivityIndicator color={colors.accent} />
        ) : (
          <Text style={styles.signOutText}>Cerrar sesión</Text>
        )}
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    flex: 1,
  },
  card: {
    gap: 4,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  name: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 18,
    color: colors.text,
  },
  signOut: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  signOutText: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.error,
  },
});
