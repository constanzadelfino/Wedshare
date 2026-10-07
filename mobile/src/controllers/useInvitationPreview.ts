import { useState } from 'react';

import { TemplateId } from '../models/Template';
import { ApiError } from '../services/apiClient';
import { getPreviewToken } from '../services/eventService';
import { buildPreviewLink, openLink } from '../services/shareService';

// "Ver mi invitación": abre en el navegador la invitación con una familia de ejemplo,
// tal como está guardada, o con otra plantilla para verla antes de elegirla.
export function useInvitationPreview(eventId: string | undefined) {
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string>();

  async function openPreview(template?: TemplateId) {
    if (!eventId) {
      return;
    }
    setError(undefined);
    setOpening(true);
    try {
      const link = buildPreviewLink(await getPreviewToken(eventId), template);
      if (!link) {
        setError('Falta configurar la dirección de la invitación (EXPO_PUBLIC_INVITE_URL). Reiniciá Expo.');
        return;
      }
      await openLink(link);
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'No pudimos abrir la invitación. Intentá de nuevo.');
    } finally {
      setOpening(false);
    }
  }

  return { opening, error, openPreview };
}
