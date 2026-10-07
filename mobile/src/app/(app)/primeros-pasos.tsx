import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { useFirstSteps } from '../../controllers/useFirstSteps';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Primeros pasos, paso 1 de 2 (onboarding, aprobado por Constanza en una muestra): se abre solo
// cuando la cuenta todavía no tiene casamiento. Sigue con Elegí una plantilla.
export default function PrimerosPasosScreen() {
  const form = useFirstSteps();
  const dateRef = useRef<TextInput>(null);
  const venueRef = useRef<TextInput>(null);

  return (
    <Screen
      topSpacing={64}
      gap={18}
      footer={
        <View style={styles.footer}>
          <FormError message={form.formError} />
          <Button title="Siguiente" loading={form.loading} onPress={form.handleNext} />
        </View>
      }
    >
      <View style={styles.header}>
        <Text style={styles.step}>Paso 1 de 2</Text>
        <Text style={styles.title} accessibilityRole="header">
          Contanos de su casamiento
        </Text>
        <Text style={text.body}>Con esto ya armamos tu invitación. Lo podés cambiar cuando quieras.</Text>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Sus nombres"
          placeholder="Ej: Sofía y Martín"
          value={form.names}
          onChangeText={form.setNames}
          error={form.fieldErrors.names}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => dateRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={dateRef}
          label="Fecha"
          placeholder="DD/MM/AAAA"
          value={form.date}
          onChangeText={form.setDate}
          error={form.fieldErrors.date}
          keyboardType="number-pad"
          maxLength={10}
          returnKeyType="next"
          onSubmitEditing={() => venueRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={venueRef}
          label="Lugar"
          placeholder="Salón o dirección"
          value={form.venue}
          onChangeText={form.setVenue}
          error={form.fieldErrors.venue}
          autoCapitalize="sentences"
          returnKeyType="done"
          onSubmitEditing={form.handleNext}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  step: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accentText,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.text,
  },
  fields: {
    gap: 16,
  },
  footer: {
    width: '100%',
    gap: 10,
  },
});
