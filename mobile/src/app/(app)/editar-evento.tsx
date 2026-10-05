import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { EventItemIcon } from '../../components/EventItemIcon';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useEventItemForm } from '../../controllers/useEventItemForm';
import { EVENT_ITEM_KINDS, eventItemLabel } from '../../models/EventItem';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

type Form = ReturnType<typeof useEventItemForm>;

const SECTION_TITLES = ['Evento', 'Fecha y hora', 'Lugar'];

// Agregar o editar (?id=) un evento del casamiento: festejo, ceremonia o civil, cuándo y dónde.
// Pantalla sin diseño propio: sigue el estilo de Nuevo regalo.
export default function EditarEventoScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const form = useEventItemForm(id, () => router.back());

  function confirmDelete() {
    const label = form.kind ? eventItemLabel(form.kind).toLowerCase() : 'este evento';
    Alert.alert('Borrar evento', `¿Querés borrar ${form.kind ? `el evento "${label}"` : label}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: form.handleDelete },
    ]);
  }

  const blocks = [
    <KindBlock key="kind" form={form} />,
    <DateBlock key="date" form={form} />,
    <PlaceBlock key="place" form={form} />,
  ];

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        form.loading || form.loadError || form.allKindsUsed ? null : (
          <Footer form={form} onDelete={confirmDelete} />
        )
      }
    >
      <ScreenHeader title={form.isEditing ? 'Editar evento' : 'Agregar evento'} showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : form.allKindsUsed ? (
        <Text style={text.body}>
          Ya agregaste el festejo, la ceremonia y el civil. Para cambiar alguno, tocalo en la lista.
        </Text>
      ) : (
        blocks.map((block, index) => (
          <View key={index} style={styles.block}>
            <Text style={text.sectionLabel}>{SECTION_TITLES[index]}</Text>
            {block}
          </View>
        ))
      )}
    </Screen>
  );
}

function Footer({ form, onDelete }: { form: Form; onDelete: () => void }) {
  return (
    <View style={styles.footer}>
      <FormError message={form.formError} />
      <Button
        title={form.isEditing ? 'Guardar' : 'Guardar evento'}
        loading={form.saving}
        disabled={form.deleting}
        onPress={form.handleSave}
      />
      {form.isEditing ? (
        <Button
          title="Borrar evento"
          variant="secondary"
          loading={form.deleting}
          disabled={form.saving}
          onPress={onDelete}
        />
      ) : null}
    </View>
  );
}

// Festejo, ceremonia y civil, en ese orden. Los que ya están en otro evento no se pueden elegir.
function KindBlock({ form }: { form: Form }) {
  return (
    <View style={styles.block}>
      <View style={styles.kindGrid} accessibilityRole="radiogroup">
        {EVENT_ITEM_KINDS.map((option) => {
          const selected = option.value === form.kind;
          const used = form.usedKinds.includes(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => form.setKind(option.value)}
              disabled={used}
              accessibilityRole="radio"
              accessibilityLabel={used ? `${option.label}, ya agregado` : option.label}
              accessibilityState={{ selected, disabled: used }}
              style={({ pressed }) => [
                styles.kindOption,
                selected && styles.kindOptionSelected,
                used && styles.kindOptionUsed,
                pressed && styles.pressed,
              ]}
            >
              <EventItemIcon
                kind={option.value}
                color={used ? colors.textSecondary : colors.accent}
                size={32}
              />
              <Text style={[styles.kindLabel, selected && styles.kindLabelSelected]}>{option.label}</Text>
              {used ? <Text style={styles.kindUsed}>Ya agregado</Text> : null}
            </Pressable>
          );
        })}
      </View>
      {form.fieldErrors.kind ? <Text style={styles.error}>{form.fieldErrors.kind}</Text> : null}
    </View>
  );
}

function DateBlock({ form }: { form: Form }) {
  return (
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
  );
}

function PlaceBlock({ form }: { form: Form }) {
  return (
    <View style={styles.block}>
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
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 14,
  },
  kindGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  kindOption: {
    flex: 1,
    minHeight: 104,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  kindOptionSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.iconBackground,
  },
  kindOptionUsed: {
    opacity: 0.6,
  },
  kindLabel: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.text,
  },
  kindLabelSelected: {
    color: colors.accentText,
  },
  kindUsed: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.textSecondary,
  },
  error: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.error,
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
