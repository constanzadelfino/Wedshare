import { router } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useRecoverPassword } from '../../controllers/useRecoverPassword';
import { colors } from '../../theme/colors';
import { text } from '../../theme/typography';

// Pantalla sin diseño propio: sigue el estilo de Registro. Dos pasos: el email, y después
// el código que llega por mail junto con la contraseña nueva.
export default function RecuperarContrasenaScreen() {
  const recover = useRecoverPassword();
  const passwordRef = useRef<TextInput>(null);

  return (
    <Screen topSpacing={56} gap={24}>
      <ScreenHeader title="Recuperar contraseña" />

      {recover.step === 'email' ? (
        <>
          <Text style={text.body}>
            Escribí el email con el que te registraste y te vamos a mandar un código para crear una
            contraseña nueva.
          </Text>

          <TextField
            label="Email"
            placeholder="tu@email.com"
            value={recover.email}
            onChangeText={recover.setEmail}
            error={recover.fieldErrors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="send"
            onSubmitEditing={recover.handleSendCode}
          />

          <View style={styles.actions}>
            <FormError message={recover.formError} />
            <Button title="Enviar código" loading={recover.loading} onPress={recover.handleSendCode} />
          </View>
        </>
      ) : (
        <>
          {/* No se avisa si el email tiene cuenta, así nadie puede averiguar quién usa Wedshare. */}
          <View style={styles.sentTo}>
            <Text style={text.body}>
              Si <Text style={styles.email}>{recover.sentTo}</Text> está registrado, en unos minutos te
              llega un mail con un código. Si no te llega, revisá la carpeta de spam y que el email esté
              bien escrito.
            </Text>
            <View style={styles.links}>
              <TextLink title="Cambiar email" onPress={recover.changeEmail} />
              <TextLink title="Crear una cuenta" onPress={() => router.replace('/registro')} />
            </View>
          </View>

          <View style={styles.fields}>
            <TextField
              label="Código"
              placeholder="123456"
              value={recover.code}
              onChangeText={recover.setCode}
              error={recover.fieldErrors.code}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              submitBehavior="submit"
            />
            <TextField
              ref={passwordRef}
              label="Contraseña nueva"
              placeholder="Elegí una contraseña"
              value={recover.password}
              onChangeText={recover.setPassword}
              error={recover.fieldErrors.password}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="go"
              onSubmitEditing={recover.handleReset}
            />
          </View>

          <View style={styles.actions}>
            <FormError message={recover.formError} />
            {recover.notice ? <Text style={styles.notice}>{recover.notice}</Text> : null}
            <Button title="Guardar y entrar" loading={recover.loading} onPress={recover.handleReset} />
            <View style={styles.resend}>
              <Text style={styles.resendText}>¿No te llegó?</Text>
              <TextLink title="Reenviar código" onPress={recover.handleSendCode} disabled={recover.loading} />
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}

function TextLink({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={styles.link}
    >
      <Text style={text.link}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sentTo: {
    gap: 4,
    alignItems: 'flex-start',
  },
  email: {
    color: colors.text,
  },
  links: {
    flexDirection: 'row',
    gap: 24,
  },
  fields: {
    gap: 16,
  },
  actions: {
    gap: 14,
  },
  notice: {
    ...text.body,
    color: colors.confirmedText,
  },
  resend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  resendText: {
    ...text.body,
  },
  // El padding lleva el área táctil a 44 px; el margen negativo conserva el espacio.
  link: {
    paddingVertical: 12,
    marginVertical: -6,
  },
});
