import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { CoverPhotos } from '../../components/CoverPhotos';
import { EventItemCard } from '../../components/EventItemCard';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { TextField } from '../../components/TextField';
import { ToggleRow } from '../../components/ToggleRow';
import { useEventItems } from '../../controllers/useEventItems';
import { useInvitationPreview } from '../../controllers/useInvitationPreview';
import { usePersonalize } from '../../controllers/usePersonalize';
import { MAX_COVER_PHOTOS } from '../../models/Event';
import { EVENT_ITEM_KINDS } from '../../models/EventItem';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

type Tab = 'cover' | 'events';

// Por ahora solo Portada y Eventos; Estilo y Secciones se suman cuando existan.
const TABS: { value: Tab; label: string }[] = [
  { value: 'cover', label: 'Portada' },
  { value: 'events', label: 'Eventos' },
];

export default function PersonalizarScreen() {
  // Desde la pestaña Invitación se abre directo en Portada (?tab=cover) o Eventos (?tab=events).
  const initialTab = useLocalSearchParams<{ tab?: string }>().tab === 'events' ? 'events' : 'cover';
  const [tab, setTab] = useState<Tab>(initialTab);
  const form = usePersonalize();
  const items = useEventItems();
  const preview = useInvitationPreview(form.event?.id);

  return (
    <Screen
      topSpacing={56}
      gap={14}
      footer={
        form.event ? (
          <View style={styles.footer}>
            <FormError message={form.formError ?? preview.error} />
            {form.saved ? <Text style={styles.saved}>Cambios guardados.</Text> : null}
            {/* Como en el diseño: "Ver mi invitación" al lado de Guardar. Muestra lo guardado. */}
            <View style={styles.footerRow}>
              <View style={styles.footerButton}>
                <Button
                  title="Ver mi invitación"
                  variant="outline"
                  loading={preview.opening}
                  onPress={() => preview.openPreview()}
                />
              </View>
              <View style={styles.footerButton}>
                <Button title="Guardar" loading={form.saving} onPress={form.handleSave} />
              </View>
            </View>
          </View>
        ) : null
      }
    >
      <ScreenHeader title="Personalizar" showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : !form.event ? (
        <>
          <Text style={text.body}>Primero creá tu evento para poder personalizar la invitación.</Text>
          <Button title="Crear evento" onPress={() => router.replace('/crear-evento')} />
        </>
      ) : (
        <>
          <SegmentedTabs options={TABS} value={tab} onChange={setTab} />

          {tab === 'cover' ? (
            <>
              <Text style={text.sectionLabel}>Fotos de portada</Text>
              <CoverPhotos
                urls={form.photoUrls}
                max={MAX_COVER_PHOTOS}
                busyIndex={form.photoBusy}
                disabled={form.coverWithoutPhotos}
                onAdd={form.addPhoto}
                onRemove={form.removePhoto}
              />
              <Text style={styles.hint}>
                Hasta 3 fotos, o activá un diseño sin fotos. Las fotos se guardan al elegirlas.
              </Text>
              <FormError message={form.photoError} />
              <ToggleRow
                title="Portada sin fotos"
                value={form.coverWithoutPhotos}
                onChange={form.setCoverWithoutPhotos}
              />
              <TextField
                label="Nombres"
                placeholder="Ej: [Nombre] y [Nombre]"
                value={form.coupleNames}
                onChangeText={form.setCoupleNames}
                autoCapitalize="words"
                maxLength={80}
              />
              <TextField
                label="Mensaje de bienvenida"
                placeholder="Unas palabras para tus invitados"
                value={form.welcomeMessage}
                onChangeText={form.setWelcomeMessage}
                multiline
                maxLength={600}
              />
            </>
          ) : (
            <>
              <TextField
                label="Fecha límite para confirmar"
                placeholder="DD/MM/AAAA"
                value={form.rsvpDeadline}
                onChangeText={form.setRsvpDeadline}
                error={form.deadlineError}
                keyboardType="number-pad"
                maxLength={10}
              />
              <Text style={text.sectionLabel}>Tus eventos</Text>
              {items.loading ? (
                <ActivityIndicator color={colors.accent} />
              ) : items.error ? (
                <FormError message={items.error} />
              ) : items.items.length === 0 ? (
                <Text style={text.body}>
                  Todavía no agregaste eventos. Sumá el festejo, la ceremonia o el civil.
                </Text>
              ) : (
                <View style={styles.items}>
                  {items.items.map((item) => (
                    <EventItemCard
                      key={item.id}
                      item={item}
                      onPress={() => router.push({ pathname: '/editar-evento', params: { id: item.id } })}
                    />
                  ))}
                </View>
              )}
              {/* Hay como máximo un festejo, una ceremonia y un civil. */}
              {items.items.length < EVENT_ITEM_KINDS.length ? (
                <Button
                  title="Agregar evento"
                  variant="outline"
                  onPress={() => router.push('/editar-evento')}
                />
              ) : null}
              <TextField
                label="Dress code y nota"
                placeholder="Ej: Formal. Blanco reservado para la novia"
                value={form.dressCode}
                onChangeText={form.setDressCode}
                maxLength={200}
              />
            </>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hint: {
    marginTop: -4,
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  items: {
    gap: 10,
  },
  saved: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.accentText,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
  },
  footer: {
    width: '100%',
    gap: 10,
  },
});
