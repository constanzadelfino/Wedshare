import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

import { apiRequest } from './apiClient';
import { supabase } from './supabaseClient';

// Avisos al celular de los novios (por ahora, cuando un grupo responde la invitación).
// El celular le da a la app un token de Expo; la app se lo pasa a la API, que es la que manda
// los avisos. Lo que eligieron los novios (avisos sí o no) se guarda en el celular, por cuenta.

export type NotificationsChoice = 'on' | 'off';

const TOKEN_KEY = 'wedshare.pushToken';

function choiceKey(userId: string) {
  return `wedshare.notifications.${userId}`;
}

async function currentUserId() {
  return (await supabase.auth.getSession()).data.session?.user.id ?? null;
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch {
    // Si no se puede guardar, la próxima vez se vuelve a preguntar: no pasa nada.
  }
}

// Con la app abierta, los avisos también se muestran arriba.
export function setUpNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// null si todavía no eligieron (nunca se les preguntó).
export async function getNotificationsChoice(): Promise<NotificationsChoice | null> {
  const userId = await currentUserId();
  const value = userId ? readStorage(choiceKey(userId)) : null;
  return value === 'on' || value === 'off' ? value : null;
}

async function saveChoice(choice: NotificationsChoice) {
  const userId = await currentUserId();
  if (userId) {
    writeStorage(choiceKey(userId), choice);
  }
}

async function getPushToken() {
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}

export type EnableResult = { ok: true } | { ok: false; error: string; openSettings?: boolean };

// Pide permiso y registra este celular. Si el permiso ya se había negado, iOS no vuelve a
// preguntar: hay que activarlo desde Ajustes.
export async function enableNotifications(): Promise<EnableResult> {
  const current = await Notifications.getPermissionsAsync();
  const permission = current.granted ? current : await Notifications.requestPermissionsAsync();
  if (!permission.granted) {
    await saveChoice('off');
    return permission.canAskAgain
      ? { ok: false, error: 'Sin permiso no podemos mandarte avisos.' }
      : {
          ok: false,
          error: 'Los avisos están desactivados para Wedshare. Activalos en Ajustes.',
          openSettings: true,
        };
  }
  try {
    const token = await getPushToken();
    await apiRequest('POST', '/push-tokens', { token });
    writeStorage(TOKEN_KEY, token);
  } catch {
    return { ok: false, error: 'No pudimos activar los avisos. Intentá de nuevo en unos minutos.' };
  }
  await saveChoice('on');
  return { ok: true };
}

// "Ahora no", o apagarlos desde Perfil: este celular deja de recibirlos.
export async function disableNotifications() {
  await saveChoice('off');
  await forgetThisPhone();
}

// Saca este celular de la cuenta (por ejemplo, antes de cerrar sesión). Si falla, no se corta nada.
export async function forgetThisPhone() {
  const token = readStorage(TOKEN_KEY);
  if (!token) {
    return;
  }
  try {
    await apiRequest('DELETE', '/push-tokens', { token });
  } catch {
    // Si el celular quedó registrado, la API lo borra cuando Expo deja de reconocerlo.
  }
  writeStorage(TOKEN_KEY, null);
}

// Al abrir la app: si los avisos están prendidos, vuelve a registrar el celular (el token puede
// cambiar, o puede haber entrado con otra cuenta). Si se sacó el permiso desde Ajustes, los apaga.
export async function refreshNotifications() {
  if ((await getNotificationsChoice()) !== 'on') {
    return;
  }
  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    await saveChoice('off');
    return;
  }
  try {
    const token = await getPushToken();
    await apiRequest('POST', '/push-tokens', { token });
    writeStorage(TOKEN_KEY, token);
  } catch {
    // Se vuelve a intentar la próxima vez que se abra la app.
  }
}

export function openNotificationSettings() {
  void Linking.openSettings();
}

// Cuando tocan un aviso: devuelve el grupo que respondió. También si el aviso abrió la app.
export function onNotificationOpened(callback: (groupId: string) => void) {
  function handle(response: Notifications.NotificationResponse | null) {
    const groupId = response?.notification.request.content.data?.groupId;
    if (typeof groupId === 'string') {
      // Se olvida, así no vuelve a abrir el mismo grupo la próxima vez.
      void Notifications.clearLastNotificationResponseAsync();
      callback(groupId);
    }
  }
  void Notifications.getLastNotificationResponseAsync().then(handle);
  const subscription = Notifications.addNotificationResponseReceivedListener(handle);
  return () => subscription.remove();
}
