import * as Clipboard from 'expo-clipboard';
import { Linking, Share } from 'react-native';

import { toWhatsAppNumber } from '../utils/phone';

// Sin la barra final, para armar los links con una sola barra.
// Expo lee esta variable al arrancar: si se agrega con Expo abierto, hay que reiniciarlo.
const inviteBaseUrl = process.env.EXPO_PUBLIC_INVITE_URL?.replace(/\/$/, '');

// Link de la invitación de un grupo, en la web del invitado. Devuelve null si falta configurarlo,
// así la pantalla igual se muestra y avisa en lugar de romperse.
export function buildInviteLink(inviteToken: string) {
  return inviteBaseUrl ? `${inviteBaseUrl}/${inviteToken}` : null;
}

// Link de la vista previa de los novios (su invitación con una familia de ejemplo).
export function buildPreviewLink(previewToken: string) {
  return inviteBaseUrl ? `${inviteBaseUrl}/vista-previa/${previewToken}` : null;
}

// Abre un link en el navegador del celular.
export function openLink(url: string) {
  return Linking.openURL(url);
}

// Si el grupo tiene WhatsApp, abre el chat con ese número y el mensaje listo.
// Si no, abre el menú de compartir del celular para elegir el contacto o la app.
export async function sendInvite(message: string, phone: string | null) {
  const number = phone ? toWhatsAppNumber(phone) : null;
  if (number) {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    await Linking.openURL(url);
    return;
  }
  await Share.share({ message });
}

export function copyText(text: string) {
  return Clipboard.setStringAsync(text);
}
