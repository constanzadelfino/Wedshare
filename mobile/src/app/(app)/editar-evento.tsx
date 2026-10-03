import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FilterChips } from '../../components/FilterChips';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useEventItemForm } from '../../controllers/useEventItemForm';
import { SUGGESTED_EVENT_ITEM_NAMES } from '../../models/EventItem';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

const NAME_OPTIONS = SUGGESTED_EVENT_ITEM_NAMES.map((name) => ({ value: name, label: name }));

// Agregar o editar un evento del casamiento (civil, ceremonia, festejo u otro).
// Pantalla sin diseño propio: sigue el estilo de Crear evento.
export default function EditarEventoScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const form = useEventItemForm(id, () => router.back());

  function confirmDelete() {
    Alert.alert('Borrar evento', `¿Querés borrar "${form.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: form.handleDelete },
    ]);
  }

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        form.loading || form.loadError ? null : (
          <View style={styles.footer}>
            <FormError message={form.formError} />
            <Button title="Guardar" loading={form.saving} disabled={form.deleting} onPress={form.handleSave} />
            {form.isEditing ? (
              <Button
                title="Borrar evento"
                variant="secondary"
                loading={form.deleting}
                disabled={form.saving}
                onPress={confirmDelete}
              />
            ) : null}
          </View>
        )
      }
    >
      <ScreenHeader title={form.isEditing ? 'Editar evento' : 'Agregar evento'} showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : (
        <View style={styles.fields}>
          <FilterChips options={NAME_OPTIONS} value={form.name} onChange={form.setName} />
          <TextField
            label="Nombre"
            placeholder="Ej: Civil, Ceremonia o Festejo"
            value={form.name}
            onChangeText={form.setName}
            error={form.fieldErrors.name}
            autoCapitalize="sentences"
            maxLength={60}
          />
          <View style={styles.row}>
            <View style={styles.half}>
              <TextField
                label="Fecha"
                placeholder="DD/MM/AAAA"
                value={form.date}
                onChangeText={form.setDate}
                error={form.fieldErrors.date}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
            <View style={styles.half}>
              <TextField
                label="Hora"
                placeholder="HH:MM"
                value={form.time}
                onChangeText={form.setTime}
                error={form.fieldErrors.time}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>
          <TextField
            label="Nombre del lugar"
            placeholder="Ej: Salón [Nombre]"
            value={form.venueName}
            onChangeText={form.setVenueName}
            error={form.fieldErrors.venueName}
            autoCapitalize="words"
            maxLength={120}
          />

          <View style={styles.addressBlock}>
            <TextField
              label="Dirección"
              placeholder={form.placesUnavailable ? 'Calle, número y ciudad' : 'Buscá la dirección o el salón'}
              value={form.address}
              onChangeText={form.setAddress}
              error={form.fieldErrors.address}
              autoCorrect={false}
              maxLength={200}
            />
            {form.searching ? <ActivityIndicator color={colors.accent} style={styles.searching} /> : null}
            {form.suggestions.length > 0 ? (
              <View style={styles.suggestions}>
                {form.suggestions.map((suggestion, index) => (
                  <Pressable
                    key={suggestion.placeId}
                    onPress={() => form.selectSuggestion(suggestion)}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                      styles.suggestion,
                      index < form.suggestions.length - 1 && styles.suggestionDivider,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.suggestionMain}>{suggestion.mainText}</Text>
                    {suggestion.secondaryText ? (
                      <Text style={styles.suggestionSecondary}>{suggestion.secondaryText}</Text>
                    ) : null}
                  </Pressable>
                ))}
              </View>
            ) : null}
            {form.hasMapLocation ? (
              <View style={styles.mapNote}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <Circle cx={12} cy={10} r={3} />
                </Svg>
                <Text style={styles.mapNoteText}>Ubicación encontrada en Google Maps.</Text>
              </View>
            ) : form.placesUnavailable ? (
              <Text style={styles.hint}>
                La búsqueda en Google Maps todavía no está disponible. Escribí la dirección completa.
              </Text>
            ) : null}
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  addressBlock: {
    gap: 8,
  },
  searching: {
    alignSelf: 'flex-start',
  },
  suggestions: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  suggestion: {
    minHeight: 52,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  suggestionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  suggestionMain: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.text,
  },
  suggestionSecondary: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  mapNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapNoteText: {
    ...text.link,
    fontSize: 13,
  },
  hint: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  footer: {
    width: '100%',
    gap: 10,
  },
});
