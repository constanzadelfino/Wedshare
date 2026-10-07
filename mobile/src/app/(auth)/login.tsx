import { Link } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FooterLink } from '../../components/FooterLink';
import { FormError } from '../../components/FormError';
import { GoogleLogo } from '../../components/GoogleLogo';
import { Logo } from '../../components/Logo';
import { OrDivider } from '../../components/OrDivider';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { useGoogleSignIn } from '../../controllers/useGoogleSignIn';
import { useLogin } from '../../controllers/useLogin';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, fieldErrors, formError, loading, handleLogin } =
    useLogin();
  const { googleError, googleLoading, handleGoogle } = useGoogleSignIn();
  const passwordRef = useRef<TextInput>(null);

  return (
    <Screen
      topSpacing={88}
      gap={28}
      footer={<FooterLink question="¿No tenés cuenta?" linkText="Registrate" href="/registro" />}
    >
      <View style={styles.brand}>
        <Logo width={60} />
        <Text style={styles.wordmark} accessibilityRole="header">
          Wedshare
        </Text>
        <View style={styles.rule} />
        <Text style={text.body}>Todo tu casamiento, en un solo lugar.</Text>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Email"
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          error={fieldErrors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={passwordRef}
          label="Contraseña"
          placeholder="Tu contraseña"
          value={password}
          onChangeText={setPassword}
          error={fieldErrors.password}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />
        <Link href="/recuperar-contrasena" style={[text.link, styles.forgot]} accessibilityRole="link">
          Olvidé mi contraseña
        </Link>
      </View>

      <View style={styles.actions}>
        <FormError message={formError ?? googleError} />
        <Button title="Ingresar" loading={loading} disabled={googleLoading} onPress={handleLogin} />
        <OrDivider />
        <Button
          title="Continuar con Google"
          variant="secondary"
          loading={googleLoading}
          disabled={loading}
          onPress={handleGoogle}
          icon={<GoogleLogo />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: {
    gap: 10,
  },
  wordmark: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 48,
    lineHeight: 54,
    color: colors.text,
  },
  rule: {
    width: 56,
    height: 2,
    backgroundColor: colors.accent,
  },
  fields: {
    gap: 16,
  },
  // El padding lleva el área táctil a 44 px; el margen negativo conserva el espacio del diseño.
  forgot: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
    marginVertical: -12,
  },
  actions: {
    gap: 14,
  },
});
