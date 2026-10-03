import { useEffect, useState } from 'react';

import { Event, MAX_COVER_PHOTOS } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { getMyEvent, removeCoverPhoto, updateEvent, uploadCoverPhoto } from '../services/eventService';
import { pickCoverPhoto } from '../services/photoPicker';
import { displayDateToIso, formatDateInput, isoDateToDisplay, todayIso } from '../utils/date';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica de Personalizar (pestañas Portada y Eventos): carga el evento, sube y quita fotos
// al momento, y guarda los textos y la fecha límite con el botón Guardar.
export function usePersonalize() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();

  // Portada.
  const [coupleNames, setCoupleNames] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [coverWithoutPhotos, setCoverWithoutPhotos] = useState(false);
  // Índice de la foto que se está subiendo o quitando, para mostrar la carga en ese lugar.
  const [photoBusy, setPhotoBusy] = useState<number | null>(null);
  const [photoError, setPhotoError] = useState<string>();

  // Eventos.
  const [rsvpDeadline, setRsvpDeadline] = useState('');
  const [dressCode, setDressCode] = useState('');

  const [deadlineError, setDeadlineError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMyEvent()
      .then((result) => {
        setEvent(result);
        if (result) {
          setCoupleNames(result.coupleNames ?? '');
          setWelcomeMessage(result.welcomeMessage ?? '');
          setCoverWithoutPhotos(result.coverWithoutPhotos);
          setRsvpDeadline(result.rsvpDeadline ? isoDateToDisplay(result.rsvpDeadline) : '');
          setDressCode(result.dressCode ?? '');
        }
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar tu evento.')))
      .finally(() => setLoading(false));
  }, []);

  // Cualquier cambio borra el aviso de "Cambios guardados".
  function edit<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setSaved(false);
    };
  }

  async function addPhoto() {
    if (!event || event.coverPhotoUrls.length >= MAX_COVER_PHOTOS) {
      return;
    }
    setPhotoError(undefined);
    try {
      const uri = await pickCoverPhoto();
      if (!uri) {
        return;
      }
      setPhotoBusy(event.coverPhotoUrls.length);
      setEvent(await uploadCoverPhoto(event.id, uri));
    } catch (error) {
      setPhotoError(errorMessage(error, 'No pudimos subir la foto. Probá con otra.'));
    } finally {
      setPhotoBusy(null);
    }
  }

  async function removePhoto(index: number) {
    if (!event) {
      return;
    }
    setPhotoError(undefined);
    setPhotoBusy(index);
    try {
      setEvent(await removeCoverPhoto(event.id, index));
    } catch (error) {
      setPhotoError(errorMessage(error, 'No pudimos quitar la foto. Intentá de nuevo.'));
    } finally {
      setPhotoBusy(null);
    }
  }

  // Devuelve la fecha límite en AAAA-MM-DD (o null si está vacía), o false si no es válida.
  function validateDeadline(): string | null | false {
    setDeadlineError(undefined);
    if (!rsvpDeadline) {
      return null;
    }
    const iso = displayDateToIso(rsvpDeadline);
    if (!iso) {
      setDeadlineError('Revisá la fecha: tiene que ser DD/MM/AAAA.');
      return false;
    }
    if (event && iso > event.date) {
      setDeadlineError('Tiene que ser antes del casamiento.');
      return false;
    }
    if (iso < todayIso()) {
      setDeadlineError('La fecha ya pasó. Elegí una fecha futura.');
      return false;
    }
    return iso;
  }

  async function handleSave() {
    if (!event) {
      return;
    }
    setFormError(undefined);
    setSaved(false);
    const deadline = validateDeadline();
    if (deadline === false) {
      setFormError('Revisá la fecha límite en la pestaña Eventos.');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateEvent(event.id, {
        coupleNames: coupleNames.trim() || null,
        welcomeMessage: welcomeMessage.trim() || null,
        coverWithoutPhotos,
        rsvpDeadline: deadline,
        dressCode: dressCode.trim() || null,
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
    coupleNames,
    setCoupleNames: edit(setCoupleNames),
    welcomeMessage,
    setWelcomeMessage: edit(setWelcomeMessage),
    coverWithoutPhotos,
    setCoverWithoutPhotos: edit(setCoverWithoutPhotos),
    photoUrls: event?.coverPhotoUrls ?? [],
    photoBusy,
    photoError,
    addPhoto,
    removePhoto,
    rsvpDeadline,
    setRsvpDeadline: edit((value: string) => setRsvpDeadline(formatDateInput(value))),
    deadlineError,
    dressCode,
    setDressCode: edit(setDressCode),
    formError,
    saved,
    saving,
    handleSave,
  };
}
