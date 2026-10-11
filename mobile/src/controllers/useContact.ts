import { useState } from 'react';

import { buildTermsLink, copyText, openLink } from '../services/shareService';

export const CONTACT_EMAIL = 'wedshare.team@gmail.com';

// La sección Ayuda de Perfil. "Escribinos" abre un mail a Wedshare (si el celular no tiene una
// app de mail, copia la dirección y lo avisa) y "Términos y privacidad" abre esos textos en la web.
export function useContact() {
  const [notice, setNotice] = useState<string>();

  async function writeToUs() {
    setNotice(undefined);
    try {
      await openLink(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Consulta sobre Wedshare')}`);
    } catch {
      await copyText(CONTACT_EMAIL);
      setNotice(`No encontramos una app de mail. Copiamos la dirección: ${CONTACT_EMAIL}`);
    }
  }

  async function openTerms() {
    setNotice(undefined);
    const link = buildTermsLink();
    if (!link) {
      setNotice('Falta configurar la dirección de la web (EXPO_PUBLIC_INVITE_URL). Reiniciá Expo.');
      return;
    }
    await openLink(link);
  }

  return { notice, writeToUs, openTerms };
}
