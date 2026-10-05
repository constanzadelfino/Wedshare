import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useBankAccountForm } from '../../controllers/useBankAccountForm';
import { colors } from '../../theme/colors';
import { text } from '../../theme/typography';

// Cuenta para transferencias. Se abre desde Regalos o desde un regalo por transferencia.
// Pantalla sin diseño propio: sigue el estilo de Nuevo regalo.
export default function CuentaBancariaScreen() {
  const form = useBankAccountForm(() => router.back());

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        form.loading || form.loadError ? null : (
          <View style={styles.footer}>
            <FormError message={form.formError} />
            <Button title="Guardar" loading={form.saving} onPress={form.handleSave} />
          </View>
        )
      }
    >
      <ScreenHeader title="Cuenta bancaria" showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : (
        <View style={styles.fields}>
          <Text style={text.body}>
            Es la cuenta que ven tus invitados en los regalos por transferencia, con un botón para
            copiar el CBU.
          </Text>
          <TextField
            label="Alias"
            placeholder="Ej: nombre.apellido.banco"
            value={form.alias}
            onChangeText={form.setAlias}
            error={form.fieldErrors.alias}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
          />
          <TextField
            label="CBU o CVU"
            placeholder="22 números"
            value={form.cbu}
            onChangeText={form.setCbu}
            error={form.fieldErrors.cbu}
            keyboardType="number-pad"
            maxLength={22}
          />
          <TextField
            label="Titular (opcional)"
            placeholder="Ej: [Nombre] [Apellido]"
            value={form.holder}
            onChangeText={form.setHolder}
            autoCapitalize="words"
            maxLength={80}
          />
          <TextField
            label="Banco (opcional)"
            placeholder="Ej: Banco [Nombre]"
            value={form.bank}
            onChangeText={form.setBank}
            autoCapitalize="words"
            maxLength={80}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 14,
  },
  footer: {
    width: '100%',
    gap: 10,
  },
});
