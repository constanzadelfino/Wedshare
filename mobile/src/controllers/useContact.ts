import { useState } from 'react';

import { copyText, openLink } from '../services/shareService';

export const CONTACT_EMAIL = 'wedshare.team@gmail.com';

// "Escribinos" en Perfil: abre un mail a Wedshare. Si el celular no tiene una app de mail,
// copia la dirección y lo avisa.
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

  return { notice, writeToUs };
}
