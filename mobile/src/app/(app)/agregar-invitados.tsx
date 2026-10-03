import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useAddGuestGroup } from '../../controllers/useAddGuestGroup';
import { colors } from '../../theme/colors';
import { fonts, radius, text } from '../../theme/typography';

// Pantalla sin diseño propio: sigue el estilo de Crear evento.
export default function AgregarInvitadosScreen() {
  const form = useAddGuestGroup(() => router.back());

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        <View style={styles.footer}>
          <FormError message={form.formError} />
          <Button title="Guardar grupo" loading={form.loading} onPress={form.handleSave} />
        </View>
      }
    >
      <ScreenHeader title="Agregar invitados" showLogo={false} />

      <Text style={text.body}>
        Cada grupo recibe un link y confirma una sola vez. Si alguien va solo, cargalo como un
        grupo de una persona.
      </Text>

      <View style={styles.fields}>
        <TextField
          label="Nombre del grupo"
          placeholder="Ej: Familia [Apellido]"
          value={form.name}
          onChangeText={form.setName}
          error={form.fieldErrors.name}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <TextField
          label="WhatsApp (opcional)"
          placeholder="Ej: 11 2345 6789"
          value={form.phone}
          onChangeText={form.setPhone}
          error={form.fieldErrors.phone}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
        />
      </View>

      <View style={styles.people}>
        <Text style={text.sectionLabel}>Personas</Text>
        {form.people.map((person, index) => (
          <View key={index} style={styles.personRow}>
            <View style={styles.personField}>
              <TextField
                label={`Persona ${index + 1}`}
                placeholder="Nombre y apellido"
                value={person}
                onChangeText={(value) => form.setPerson(index, value)}
                autoCapitalize="words"
                autoComplete="off"
              />
            </View>
            {form.people.length > 1 ? (
              <Pressable
                onPress={() => form.removePerson(index)}
                accessibilityRole="button"
                accessibilityLabel={`Quitar persona ${index + 1}`}
                style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}
              >
                <Svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.text}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M18 6L6 18M6 6l12 12" />
                </Svg>
              </Pressable>
            ) : null}
          </View>
        ))}
        {form.fieldErrors.people ? (
          <Text style={styles.error}>{form.fieldErrors.people}</Text>
        ) : null}
        {form.canAddPerson ? (
          <Button title="Agregar persona" variant="secondary" onPress={form.addPerson} />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 14,
  },
  people: {
    gap: 12,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  personField: {
    flex: 1,
  },
  // Mismo alto que el campo (52 px) para que quede alineado.
  removeButton: {
    width: 52,
    height: 52,
    borderRadius: radius.control,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  error: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.error,
  },
  footer: {
    width: '100%',
    gap: 14,
  },
});
