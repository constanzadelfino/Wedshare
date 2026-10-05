import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { getMyEvent, updateEvent } from '../services/eventService';
import { saveCoverToPhotos } from '../services/coverSaver';
import { openLink } from '../services/shareService';

// Ayuda de Spotify para cambiar la portada de una playlist.
const SPOTIFY_COVER_HELP = 'https://support.spotify.com/ar/article/add-playlist-cover/';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica de la pantalla Playlist: el link a la playlist de Spotify de los novios y si se
// muestra en la invitación. El interruptor se guarda al momento; el link, con Guardar.
export function usePlaylist() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  // La portada que se ve en pantalla: se guarda como imagen.
  const coverRef = useRef<View>(null);
  const [savingCover, setSavingCover] = useState(false);
  const [coverMessage, setCoverMessage] = useState<string>();

  useEffect(() => {
    getMyEvent()
      .then((myEvent) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setUrl(myEvent.spotifyPlaylistUrl ?? '');
      })
      .catch((reason) => setLoadError(errorMessage(reason, 'No pudimos cargar la playlist.')))
      .finally(() => setLoading(false));
  }, []);

  async function setShowPlaylist(value: boolean) {
    if (!event) {
      return;
    }
    setError(undefined);
    setEvent({ ...event, playlistEnabled: value });
    try {
      setEvent(await updateEvent(event.id, { playlistEnabled: value }));
    } catch (reason) {
      setEvent((current) => (current ? { ...current, playlistEnabled: !value } : current));
      setError(errorMessage(reason, 'No pudimos guardar el cambio. Intentá de nuevo.'));
    }
  }

  async function handleSave() {
    if (!event) {
      return;
    }
    setError(undefined);
    setSaving(true);
    try {
      // La API valida que sea un link de playlist de Spotify.
      const updated = await updateEvent(event.id, { spotifyPlaylistUrl: url.trim() || null });
      setEvent(updated);
      setUrl(updated.spotifyPlaylistUrl ?? '');
      setSaved(true);
    } catch (reason) {
      setError(errorMessage(reason, 'No pudimos guardar el link. Intentá de nuevo.'));
    } finally {
      setSaving(false);
    }
  }

  async function openPlaylist() {
    if (event?.spotifyPlaylistUrl) {
      await openLink(event.spotifyPlaylistUrl).catch(() =>
        setError('No pudimos abrir Spotify. Revisá que el link esté bien.'),
      );
    }
  }

  async function saveCover() {
    setCoverMessage(undefined);
    setSavingCover(true);
    try {
      const ok = await saveCoverToPhotos(coverRef);
      setCoverMessage(
        ok
          ? 'Listo, la portada está en tus fotos.'
          : 'Para guardarla, permití que Wedshare guarde imágenes en tus fotos.',
      );
    } catch {
      setCoverMessage('No pudimos guardar la portada. Intentá de nuevo.');
    } finally {
      setSavingCover(false);
    }
  }

  return {
    event,
    coverRef,
    savingCover,
    coverMessage,
    saveCover,
    openCoverHelp: () => openLink(SPOTIFY_COVER_HELP).catch(() => undefined),
    loading,
    loadError,
    url,
    setUrl: (value: string) => {
      setUrl(value);
      setSaved(false);
    },
    changed: url.trim() !== (event?.spotifyPlaylistUrl ?? ''),
    error,
    saving,
    saved,
    setShowPlaylist,
    handleSave,
    openPlaylist,
  };
}
