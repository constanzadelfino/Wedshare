import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
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
            label="Link de tu playlist de Spotify"
            placeholder="https://open.spotify.com/playlist/..."
            value={playlist.url}
            onChangeText={playlist.setUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          <Text style={styles.note}>
            Para que tus invitados sumen canciones, en Spotify abrí la playlist, tocá el ícono de
            agregar persona (Invitar colaboradores) y pegá ese link acá. Si solo querés que la
            escuchen, usá Compartir y Copiar link (la playlist tiene que ser pública).
          </Text>
          {event.spotifyPlaylistUrl ? (
            <Text style={styles.linkKind}>
              {isCollaborativeLink(event.spotifyPlaylistUrl)
                ? 'Tus invitados pueden sumar canciones con este link.'
                : 'Con este link tus invitados la escuchan, pero no pueden sumar canciones.'}
            </Text>
          ) : null}
          {event.spotifyPlaylistUrl ? (
            <Button title="Abrir en Spotify" variant="outline" onPress={playlist.openPlaylist} />
          ) : null}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    backgroundColor: colors.iconBackground,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    overflow: 'hidden',
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
