import { useEffect, useState } from 'react';

import { Event } from '../models/Event';
import { TemplateId } from '../models/Template';
import { ApiError } from '../services/apiClient';
import { getMyEvent, updateEvent } from '../services/eventService';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica de "Elegí una plantilla": se marca una, se puede ver la vista previa con esa plantilla
// sin guardarla, y "Usar plantilla" la guarda. onDone dice qué pasa después (volver, o seguir
// con el onboarding).
export function useChooseTemplate(onDone: () => void) {
  const [event, setEvent] = useState<Event | null>(null);
  const [selected, setSelected] = useState<TemplateId>('dorado');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMyEvent()
      .then((myEvent) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setSelected(myEvent.template);
      })
      .catch((reason) => setLoadError(errorMessage(reason, 'No pudimos cargar tu invitación.')))
      .finally(() => setLoading(false));
  }, []);

  async function saveTemplate() {
    if (!event) {
      return;
    }
    if (selected === event.template) {
      onDone();
      return;
    }
    setError(undefined);
    setSaving(true);
    try {
      await updateEvent(event.id, { template: selected });
      onDone();
    } catch (reason) {
      setError(errorMessage(reason, 'No pudimos guardar la plantilla. Intentá de nuevo.'));
      setSaving(false);
    }
  }

  return {
    event,
    selected,
    select: setSelected,
    loading,
    loadError,
    error,
    saving,
    saveTemplate,
  };
}
