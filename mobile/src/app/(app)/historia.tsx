import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { CoverPhotos } from '../../components/CoverPhotos';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useInvitationPreview } from '../../controllers/useInvitationPreview';
import { useStory } from '../../controllers/useStory';
import { MAX_ALBUM_PHOTOS } from '../../models/Event';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Historia y álbum (pantalla 14 del diseño): foto y texto de la historia, álbum y frase final.
export default function HistoriaScreen() {
  const form = useStory();
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
            <View style={styles.footerRow}>
              <View style={styles.footerButton}>
                <Button
                  title="Ver mi invitación"
                  variant="outline"
                  loading={preview.opening}
                  onPress={preview.openPreview}
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
      <ScreenHeader title="Historia y álbum" showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : (
        <>
          <Text style={[text.sectionLabel, styles.section]}>Nuestra historia</Text>
          <View style={styles.storyRow}>
            <View style={styles.storyPhoto}>
              <CoverPhotos
                urls={form.storyPhotoUrl ? [form.storyPhotoUrl] : []}
                max={1}
                aspectRatio={4 / 5}
                busyIndex={form.storyPhotoBusy ? 0 : null}
                disabled={form.photoBusy && !form.storyPhotoBusy}
                onAdd={form.changeStoryPhoto}
                onRemove={form.deleteStoryPhoto}
              />
            </View>
            <View style={styles.storyFields}>
              <TextField
                label="Título (opcional)"
                placeholder="Ej: Así empezó todo"
                value={form.storyTitle}
                onChangeText={form.setStoryTitle}
                autoCapitalize="sentences"
                maxLength={80}
              />
            </View>
          </View>
          <TextField
            label="La historia"
            placeholder="Contá cómo se conocieron"
            value={form.storyText}
            onChangeText={form.setStoryText}
            multiline
            maxLength={2000}
          />

          <Text style={[text.sectionLabel, styles.section]}>Álbum de fotos</Text>
          <CoverPhotos
            urls={form.albumPhotoUrls}
            max={MAX_ALBUM_PHOTOS}
            columns={4}
            aspectRatio={1}
            busyIndex={form.albumBusyIndex}
            disabled={form.photoBusy && form.albumBusyIndex === null}
            onAdd={form.addAlbumPhoto}
            onRemove={form.deleteAlbumPhoto}
          />
          <FormError message={form.photoError} />

          <Text style={[text.sectionLabel, styles.section]}>Frase final</Text>
          <TextField
            label="Frase"
            placeholder="Ej: La medida del amor es amar sin medida"
            value={form.closingPhrase}
            onChangeText={form.setClosingPhrase}
            autoCapitalize="sentences"
            maxLength={200}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  storyPhoto: {
    width: 104,
  },
  storyFields: {
    flex: 1,
  },
  saved: {
    ...text.link,
    fontSize: 13,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    gap: 10,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
  },
});
