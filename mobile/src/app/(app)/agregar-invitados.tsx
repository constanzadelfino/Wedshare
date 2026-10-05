import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FilterChips } from '../../components/FilterChips';
import { FormError } from '../../components/FormError';
import { PersonRow } from '../../components/PersonRow';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { AddMode, useAddGuestGroup } from '../../controllers/useAddGuestGroup';
import { FAMILY_PREFIX } from '../../models/Guest';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

const MODES: { value: AddMode; label: string }[] = [
  { value: 'single', label: 'Una persona' },
  { value: 'group', label: 'Familia' },
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
            title={form.mode === 'single' ? 'Guardar invitado' : 'Guardar familia'}
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
          : 'La familia recibe un solo link y confirma una sola vez por todos.'}
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
            label="Apellido de la familia"
            prefix={FAMILY_PREFIX}
            placeholder="[Apellido]"
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
            <PersonRow
              key={index}
              index={index}
              value={person}
              onChangeText={(value) => form.setPerson(index, value)}
              onRemove={form.people.length > 1 ? () => form.removePerson(index) : undefined}
            />
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
