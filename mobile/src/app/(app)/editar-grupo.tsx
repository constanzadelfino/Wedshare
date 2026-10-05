import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { PersonRow } from '../../components/PersonRow';
import { Screen } from '../../components/Screen';
import { StatusBadge } from '../../components/StatusBadge';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useEditGuestGroup } from '../../controllers/useEditGuestGroup';
import { FAMILY_PREFIX } from '../../models/Guest';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Una familia o un invitado solo: compartir su link, editar sus datos y borrarlo.
// Pantalla sin diseño propio: sigue el estilo de Agregar invitados.
export default function EditarGrupoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const form = useEditGuestGroup(id, () => router.back());

  function confirmDelete() {
    const message = form.single
      ? `¿Querés borrar a "${form.group?.name}" de tus invitados?`
      : `¿Querés borrar a la "${form.group?.name}" con todas sus personas?`;
    Alert.alert(form.single ? 'Borrar invitado' : 'Borrar familia', message, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: form.handleDelete },
    ]);
  }

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        form.group ? (
          <View style={styles.footer}>
            <FormError message={form.formError} />
            <Button title="Guardar" loading={form.saving} disabled={form.deleting} onPress={form.handleSave} />
            <Button
              title={form.single ? 'Borrar invitado' : 'Borrar familia'}
              variant="secondary"
              loading={form.deleting}
              disabled={form.saving}
              onPress={confirmDelete}
            />
          </View>
        ) : null
      }
    >
      <ScreenHeader title={form.single ? 'Invitado' : 'Familia'} showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : (
        <>
          <View style={styles.shareCard}>
            <Text style={text.sectionLabel}>Invitación</Text>
            <Text style={styles.link} numberOfLines={1} selectable>
              {form.link ?? 'Link no disponible'}
            </Text>
            <Button
              title={form.hasPhone ? 'Enviar por WhatsApp' : 'Compartir invitación'}
              onPress={form.handleSend}
            />
            <Button title="Copiar link" variant="outline" onPress={form.handleCopy} />
            {form.shareMessage ? <Text style={styles.shareMessage}>{form.shareMessage}</Text> : null}
          </View>

          {/* Lo que respondió la familia. Se muestra cuando alguien ya contestó. */}
          {form.group && form.group.guests.some((guest) => guest.status !== 'pending') ? (
            <View style={styles.shareCard}>
              <Text style={text.sectionLabel}>Respuesta</Text>
              {form.group.guests.map((guest) => (
                <View key={guest.id} style={styles.answer}>
                  <View style={styles.answerTexts}>
                    <Text style={styles.answerName}>{guest.name}</Text>
                    {guest.status === 'confirmed' && guest.dietary ? (
                      <Text style={styles.answerDetail}>{guest.dietary}</Text>
                    ) : null}
                  </View>
                  <StatusBadge status={guest.status} />
                </View>
              ))}
              {form.group.message ? (
                <View style={styles.message}>
                  <Text style={text.label}>Mensaje para ustedes</Text>
                  <Text style={styles.messageText}>{form.group.message}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          <View style={styles.fields}>
            <TextField
              label={form.single ? 'Nombre y apellido' : 'Apellido de la familia'}
              prefix={form.single ? undefined : FAMILY_PREFIX}
              placeholder={form.single ? 'Ej: [Nombre] [Apellido]' : '[Apellido]'}
              value={form.name}
              onChangeText={form.setName}
              error={form.fieldErrors.name}
              autoCapitalize="words"
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

          {form.single ? null : (
            <View style={styles.people}>
              <Text style={text.sectionLabel}>Personas</Text>
              {form.people.map((person, index) => (
                <PersonRow
                  key={person.key}
                  index={index}
                  value={person.name}
                  onChangeText={(value) => form.setPerson(person.key, value)}
                  onRemove={form.people.length > 1 ? () => form.removePerson(person.key) : undefined}
                />
              ))}
              {form.fieldErrors.people ? (
                <Text style={styles.error}>{form.fieldErrors.people}</Text>
              ) : null}
              {form.canAddPerson ? (
                <Button title="Agregar persona" variant="secondary" onPress={form.addPerson} />
              ) : null}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  shareCard: {
    gap: 12,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
  },
  link: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
  shareMessage: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.accentText,
    textAlign: 'center',
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  answerTexts: {
    flex: 1,
    gap: 2,
  },
  answerName: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  answerDetail: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  message: {
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageText: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 21,
    color: colors.text,
  },
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
    gap: 10,
  },
});
