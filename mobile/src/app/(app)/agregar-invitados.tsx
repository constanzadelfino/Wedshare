import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FilterChips } from '../../components/FilterChips';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { AddMode, useAddGuestGroup } from '../../controllers/useAddGuestGroup';
import { colors } from '../../theme/colors';
import { fonts, radius, text } from '../../theme/typography';

const MODES: { value: AddMode; label: string }[] = [
  { value: 'single', label: 'Una persona' },
  { value: 'group', label: 'Grupo o familia' },
];

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
          <Button
            title={form.mode === 'single' ? 'Guardar invitado' : 'Guardar grupo'}
            loading={form.loading}
            onPress={form.handleSave}
          />
        </View>
      }
    >
      <ScreenHeader title="Agregar invitados" showLogo={false} />

      <FilterChips options={MODES} value={form.mode} onChange={form.setMode} />

      <Text style={text.body}>
        {form.mode === 'single'
          ? 'La persona recibe su propio link para ver la invitación y confirmar.'
          : 'El grupo recibe un solo link y confirma una sola vez por todos.'}
      </Text>

      <View style={styles.fields}>
        {form.mode === 'single' ? (
          <TextField
            label="Nombre y apellido"
            placeholder="Ej: [Nombre] [Apellido]"
            value={form.personName}
            onChangeText={form.setPersonName}
            error={form.fieldErrors.person}
            autoCapitalize="words"
            autoComplete="off"
            returnKeyType="next"
          />
        ) : (
          <TextField
            label="Nombre del grupo"
            placeholder="Ej: Familia [Apellido]"
            value={form.name}
            onChangeText={form.setName}
            error={form.fieldErrors.name}
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
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

      {form.mode === 'group' ? (
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
      ) : null}
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
