import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useEditName } from '../../controllers/useEditName';
import { text } from '../../theme/typography';

// "Tu nombre" desde Perfil (sin diseño propio, sigue el estilo de Registro).
export default function EditarNombreScreen() {
  const form = useEditName();

  return (
    <Screen topSpacing={56} gap={24}>
      <ScreenHeader title="Tu nombre" />
      <Text style={text.body}>
        Es el nombre de tu cuenta. Los nombres que ven tus invitados se cambian en Datos del casamiento.
      </Text>

      <TextField
        label="Nombre"
        placeholder="Tu nombre"
        value={form.name}
        onChangeText={form.setName}
        error={form.fieldError}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="done"
        onSubmitEditing={form.save}
      />

      <View style={styles.actions}>
        <FormError message={form.formError} />
        <Button title="Guardar" loading={form.saving} onPress={form.save} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 14,
  },
});
