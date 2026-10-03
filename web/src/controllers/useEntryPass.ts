import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import { Invitation } from '../models/Invitation';
import { sharePassImage } from '../services/passImage';
import { dayAndMonth } from '../utils/dates';
import { splitCoupleNames } from '../utils/names';

// Lo que lee la app de los novios al escanear: el prefijo indica que es un pase de Wedshare.
export function entryQrText(entryCode: string) {
  return `wedshare:${entryCode}`;
}

// Pase de ingreso del grupo: el QR, para cuántas personas vale y la opción de guardarlo
// como imagen para usarlo sin señal.
export function useEntryPass(invitation: Invitation) {
  const { event, group } = invitation;
  const entryCode = group.entryCode;
  const attendees = group.guests.filter((guest) => guest.status === 'confirmed').map((guest) => guest.name);
  const names = splitCoupleNames(event.coupleNames);
  const title = names.length === 2 ? `${names[0]} & ${names[1]}` : (names[0] ?? event.name);
  const subtitle = `${dayAndMonth(event.date)} · ${event.venue}`;

  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!entryCode) {
      setQrSvg(null);
      return;
    }
    let active = true;
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--tpl-ink').trim();
    QRCode.toString(entryQrText(entryCode), {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: ink || '#2E2418', light: '#FFFFFF' },
    }).then((svg) => active && setQrSvg(svg));
    return () => {
      active = false;
    };
  }, [entryCode]);

  async function saveImage() {
    if (!entryCode || saving) {
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await sharePassImage({ title, subtitle, groupName: group.name, attendees, qrText: entryQrText(entryCode) });
    } catch {
      setSaveError('No pudimos guardar la imagen. Probá con una captura de pantalla.');
    } finally {
      setSaving(false);
    }
  }

  return { entryCode, qrSvg, title, subtitle, attendees, saving, saveError, saveImage };
}
