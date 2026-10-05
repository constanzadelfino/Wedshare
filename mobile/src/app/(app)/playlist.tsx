import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { PlaylistCover } from '../../components/PlaylistCover';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { ToggleRow } from '../../components/ToggleRow';
import { usePlaylist } from '../../controllers/usePlaylist';
import { isCollaborativeLink } from '../../models/Event';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Playlist: el link a una playlist de Spotify, que la invitación muestra con el reproductor de
// Spotify. Si es el link de "Invitar colaboradores", los invitados pueden sumar canciones desde
// Spotify. Reemplaza el diseño de "Playlist del DJ" (decisión de Constanza).
export default function PlaylistScreen() {
  const playlist = usePlaylist();
  const event = playlist.event;

  return (
    <Screen
      topSpacing={56}
      gap={16}
      footer={
        event ? (
          <View style={styles.footer}>
            <FormError message={playlist.error} />
            {playlist.saved && !playlist.changed ? <Text style={styles.saved}>Link guardado.</Text> : null}
            <Button
              title="Guardar"
              loading={playlist.saving}
              disabled={!playlist.changed}
              onPress={playlist.handleSave}
            />
          </View>
        ) : null
      }
    >
      <ScreenHeader title="Playlist" showLogo={false} />

      {playlist.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : playlist.loadError || !event ? (
        <FormError message={playlist.loadError} />
      ) : (
        <>
          <ToggleRow
            title="Mostrar en la invitación"
            subtitle={event.playlistEnabled ? 'Tus invitados pueden escucharla' : 'La sección está oculta'}
            value={event.playlistEnabled}
            onChange={playlist.setShowPlaylist}
          />
          <TextField
            label="Link de tu playlist colaborativa"
            placeholder="https://open.spotify.com/playlist/..."
            value={playlist.url}
            onChangeText={playlist.setUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          <View style={styles.note}>
            <Text style={styles.noteTitle}>
              Para que tus invitados sumen canciones, la playlist tiene que ser colaborativa:
            </Text>
            {[
              'En Spotify, creá una playlist para la fiesta.',
              'Abrila y tocá el ícono de agregar persona (Invitar colaboradores).',
              'Copiá el link que te da Spotify y pegalo acá.',
            ].map((step, index) => (
              <Text key={step} style={styles.noteText}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
          {event.spotifyPlaylistUrl ? (
            <Text style={styles.linkKind}>
              {isCollaborativeLink(event.spotifyPlaylistUrl)
                ? 'Tus invitados pueden sumar canciones con este link.'
                : 'Este link no es el de Invitar colaboradores: tus invitados la escuchan, pero no pueden sumar canciones.'}
            </Text>
          ) : null}
          {event.spotifyPlaylistUrl ? (
            <Button title="Abrir en Spotify" variant="outline" onPress={playlist.openPlaylist} />
          ) : null}

          <Text style={[text.sectionLabel, styles.section]}>Portada para tu playlist</Text>
          {event.coupleNames ? (
            <>
              <Text style={styles.hint}>
                Ponela como portada en Spotify: el reproductor de la invitación toma sus colores.
              </Text>
              <View style={styles.coverWrap}>
                <PlaylistCover ref={playlist.coverRef} coupleNames={event.coupleNames} date={event.date} size={240} />
              </View>
              <Button title="Guardar imagen" loading={playlist.savingCover} onPress={playlist.saveCover} />
              {playlist.coverMessage ? <Text style={styles.coverMessage}>{playlist.coverMessage}</Text> : null}
              <View style={styles.note}>
                <Text style={styles.noteTitle}>Para ponerla en Spotify:</Text>
                {[
                  'Guardá la imagen.',
                  'En Spotify, abrí tu playlist y tocá los tres puntos, después Editar.',
                  'Tocá la portada y elegí la imagen que guardaste.',
                ].map((step, index) => (
                  <Text key={step} style={styles.noteText}>
                    {index + 1}. {step}
                  </Text>
                ))}
                <Pressable onPress={playlist.openCoverHelp} accessibilityRole="link" style={styles.helpLink}>
                  <Text style={text.link}>Ver la ayuda de Spotify</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <Text style={styles.hint}>
              Cargá sus nombres en Portada para armar una portada con sus iniciales.
            </Text>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    gap: 4,
    backgroundColor: colors.iconBackground,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  noteTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },
  noteText: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  section: {
    marginTop: 12,
  },
  hint: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  coverWrap: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  coverMessage: {
    ...text.link,
    fontSize: 13,
    textAlign: 'center',
  },
  helpLink: {
    minHeight: 44,
    justifyContent: 'center',
  },
  linkKind: {
    ...text.link,
    fontSize: 13,
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
});
