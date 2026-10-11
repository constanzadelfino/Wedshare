import Constants from 'expo-constants';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { FormError } from '../../../components/FormError';
import { Logo } from '../../../components/Logo';
import { quickActionIconProps } from '../../../components/QuickAction';
import { Screen } from '../../../components/Screen';
import { useAuth } from '../../../context/AuthContext';
import { useContact } from '../../../controllers/useContact';
import { useSignOut } from '../../../controllers/useSignOut';
import { colors } from '../../../theme/colors';
import { fonts, text } from '../../../theme/typography';

// Perfil (sin diseño propio; opción A elegida por Constanza en una muestra): la cuenta, ayuda,
// "Cerrar sesión" y "Eliminar mi cuenta". Lo del casamiento queda en Inicio y en la pestaña Invitación.
export default function PerfilScreen() {
  const { user } = useAuth();
  const signOut = useSignOut();
  const contact = useContact();
  const initial = (user?.name?.trim() || user?.email || '?').charAt(0).toUpperCase();

  return (
    <Screen topSpacing={64} gap={16}>
      <View style={styles.header}>
        <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
          Perfil
        </Text>
        <Logo width={34} />
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar} accessibilityElementsHidden importantForAccessibility="no">
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.profileText}>
          {user?.name ? <Text style={styles.name}>{user.name}</Text> : null}
          <Text style={styles.email}>{user?.email}</Text>
          {user && !user.hasPassword ? <Text style={styles.chip}>Cuenta de Google</Text> : null}
        </View>
      </View>

      <Text style={styles.section}>Tu cuenta</Text>
      <View style={styles.list}>
        <Row
          title="Tu nombre"
          value={user?.name}
          onPress={() => router.push('/editar-nombre')}
          icon={
            <Svg {...quickActionIconProps}>
              <Path d="M20 21a8 8 0 0 0-16 0" />
              <Circle cx={12} cy={8} r={4} />
            </Svg>
          }
        />
        {user?.hasPassword ? (
          <Row
            title="Cambiar contraseña"
            onPress={() => router.push('/cambiar-contrasena')}
            icon={
              <Svg {...quickActionIconProps}>
                <Rect x={4} y={11} width={16} height={10} rx={2} />
                <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </Svg>
            }
          />
        ) : null}
      </View>

      <Text style={styles.section}>Ayuda</Text>
      <View style={styles.list}>
        <Row
          title="Ver la presentación"
          onPress={() => router.push('/presentacion')}
          icon={
            <Svg {...quickActionIconProps}>
              <Rect x={3} y={4} width={18} height={16} rx={2} />
              <Path d="M10 9l5 3-5 3z" />
            </Svg>
          }
        />
        <Row
          title="Escribinos"
          onPress={contact.writeToUs}
          icon={
            <Svg {...quickActionIconProps}>
              <Rect x={3} y={5} width={18} height={14} rx={2} />
              <Path d="M3 7l9 6 9-6" />
            </Svg>
          }
        />
      </View>
      {contact.notice ? <Text style={styles.notice}>{contact.notice}</Text> : null}

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

      <Pressable onPress={() => router.push('/eliminar-cuenta')} accessibilityRole="button" style={styles.delete}>
        <Text style={styles.deleteText}>Eliminar mi cuenta</Text>
      </Pressable>

      <Text style={styles.version}>Wedshare {Constants.expoConfig?.version}</Text>
    </Screen>
  );
}

function Row({ icon, title, value, onPress }: { icon: ReactNode; title: string; value?: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={value ? `${title}: ${value}` : title}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {icon}
      <Text style={styles.rowTitle}>{title}</Text>
      {value ? (
        <Text style={styles.rowValue} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 6l6 6-6 6" />
      </Svg>
    </Pressable>
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
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.darkBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 20,
    color: colors.lightGold,
  },
  profileText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 17,
    color: colors.text,
  },
  email: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.accentText,
  },
  section: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.accentText,
    marginTop: 4,
    marginBottom: -6,
    marginHorizontal: 4,
  },
  list: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: 'hidden',
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    marginTop: -StyleSheet.hairlineWidth,
  },
  rowTitle: {
    flex: 1,
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.text,
  },
  rowValue: {
    maxWidth: '40%',
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  notice: {
    ...text.body,
    marginTop: -6,
    marginHorizontal: 4,
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
  delete: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
  deleteText: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  version: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.textSecondary,
  },
});
