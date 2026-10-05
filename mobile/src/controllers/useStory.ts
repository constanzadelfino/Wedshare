import { useEffect, useState } from 'react';

import { Event, MAX_ALBUM_PHOTOS } from '../models/Event';
import { ApiError } from '../services/apiClient';
import {
  getMyEvent,
  removeAlbumPhoto,
  removeStoryPhoto,
  updateEvent,
  uploadAlbumPhoto,
  uploadStoryPhoto,
} from '../services/eventService';
import { pickAlbumPhoto, pickStoryPhoto } from '../services/photoPicker';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Qué foto se está subiendo o quitando: la de la historia o una del álbum (por posición).
type PhotoBusy = { kind: 'story' } | { kind: 'album'; index: number } | null;

// Lógica de "Historia, álbum y música" (pantalla 14 del diseño). Los textos se guardan con
// Guardar; las fotos se suben y se quitan al momento, como en la Portada.
export function useStory() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [storyTitle, setStoryTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [closingPhrase, setClosingPhrase] = useState('');
  const [photoBusy, setPhotoBusy] = useState<PhotoBusy>(null);
  const [photoError, setPhotoError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getMyEvent()
      .then((myEvent) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setStoryTitle(myEvent.storyTitle ?? '');
        setStoryText(myEvent.storyText ?? '');
        setClosingPhrase(myEvent.closingPhrase ?? '');
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar tu invitación.')))
      .finally(() => setLoading(false));
  }, []);

  // Al cambiar un texto, el aviso de "guardado" deja de valer.
  function edit<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setSaved(false);
    };
  }

  async function runPhoto(busy: PhotoBusy, action: () => Promise<Event>, fallback: string) {
    setPhotoError(undefined);
    setPhotoBusy(busy);
    try {
      setEvent(await action());
    } catch (error) {
      setPhotoError(errorMessage(error, fallback));
    } finally {
      setPhotoBusy(null);
    }
  }

  async function changeStoryPhoto() {
    if (!event) {
      return;
    }
    const uri = await pickStoryPhoto().catch(() => null);
    if (uri) {
      await runPhoto({ kind: 'story' }, () => uploadStoryPhoto(event.id, uri), 'No pudimos subir la foto. Probá con otra.');
    }
  }

  async function deleteStoryPhoto() {
    if (event) {
      await runPhoto({ kind: 'story' }, () => removeStoryPhoto(event.id), 'No pudimos quitar la foto. Intentá de nuevo.');
    }
  }

  async function addAlbumPhoto() {
    if (!event || event.albumPhotoUrls.length >= MAX_ALBUM_PHOTOS) {
      return;
    }
    const uri = await pickAlbumPhoto().catch(() => null);
    if (uri) {
      const index = event.albumPhotoUrls.length;
      await runPhoto({ kind: 'album', index }, () => uploadAlbumPhoto(event.id, uri), 'No pudimos subir la foto. Probá con otra.');
    }
  }

  async function deleteAlbumPhoto(index: number) {
    if (event) {
      await runPhoto({ kind: 'album', index }, () => removeAlbumPhoto(event.id, index), 'No pudimos quitar la foto. Intentá de nuevo.');
    }
  }

  async function handleSave() {
    if (!event) {
      return;
    }
    setFormError(undefined);
    setSaving(true);
    try {
      const updated = await updateEvent(event.id, {
        storyTitle: storyTitle.trim() || null,
        storyText: storyText.trim() || null,
        closingPhrase: closingPhrase.trim() || null,
      });
      setEvent(updated);
      setSaved(true);
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos guardar los cambios. Intentá de nuevo.'));
    } finally {
      setSaving(false);
    }
  }

  return {
    event,
    loading,
    loadError,
    storyTitle,
    setStoryTitle: edit(setStoryTitle),
    storyText,
    setStoryText: edit(setStoryText),
    closingPhrase,
    setClosingPhrase: edit(setClosingPhrase),
    storyPhotoUrl: event?.storyPhotoUrl ?? null,
    albumPhotoUrls: event?.albumPhotoUrls ?? [],
    // Posición de la foto del álbum que se está subiendo o quitando.
    albumBusyIndex: photoBusy?.kind === 'album' ? photoBusy.index : null,
    storyPhotoBusy: photoBusy?.kind === 'story',
    photoBusy: photoBusy !== null,
    photoError,
    changeStoryPhoto,
    deleteStoryPhoto,
    addAlbumPhoto,
    deleteAlbumPhoto,
    formError,
    saving,
    saved,
    handleSave,
  };
}
