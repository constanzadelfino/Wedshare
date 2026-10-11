import { router } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useChangePassword } from '../../controllers/useChangePassword';
import { colors } from '../../theme/colors';
import { text } from '../../theme/typography';

// "Cambiar contraseña" desde Perfil (sin diseño propio, sigue el estilo de Recuperar contraseña).
// Solo para cuentas con email: con Google no hay contraseña de Wedshare.
export default function CambiarContrasenaScreen() {
  const form = useChangePassword();
  const nextRef = useRef<TextInput>(null);

  return (
    <Screen topSpacing={56} gap={24}>
      <ScreenHeader title="Cambiar contraseña" />

      {form.done ? (
        <>
          <Text style={[text.body, styles.done]}>Listo, ya podés ingresar con tu contraseña nueva.</Text>
          <Button title="Volver" onPress={() => router.back()} />
        </>
      ) : (
        <>
          <View style={styles.fields}>
            <TextField
              label="Contraseña actual"
              placeholder="La que usás hoy"
              value={form.current}
              onChangeText={form.setCurrent}
              error={form.fieldErrors.current}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
              textContentType="password"
              returnKeyType="next"
              onSubmitEditing={() => nextRef.current?.focus()}
              submitBehavior="submit"
            />
            <TextField
              ref={nextRef}
              label="Contraseña nueva"
              placeholder="Elegí una contraseña"
              value={form.next}
              onChangeText={form.setNext}
              error={form.fieldErrors.next}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="go"
              onSubmitEditing={form.save}
            />
          </View>

          <View style={styles.actions}>
            <FormError message={form.formError} />
            <Button title="Guardar" loading={form.saving} onPress={form.save} />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },
  actions: {
    gap: 14,
  },
  done: {
    color: colors.confirmedText,
  },
});
