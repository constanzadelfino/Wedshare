import { useEffect, useState } from 'react';

import {
  disableNotifications,
  enableNotifications,
  getNotificationsChoice,
  onNotificationOpened,
  openNotificationSettings,
  refreshNotifications,
  setUpNotifications,
} from '../services/notificationService';

// Al entrar a la app con sesión: prepara los avisos y, al tocar uno, abre el grupo que respondió
// (onOpenGroup). Vienen prendidos: la primera vez se pide el permiso del celular (sin él, ninguna
// app puede mandar avisos); después solo se vuelve a registrar el celular.
export function useNotificationsSetup(onOpenGroup: (groupId: string) => void) {
  useEffect(() => {
    setUpNotifications();
    void (async () => {
      if ((await getNotificationsChoice()) === null) {
        await enableNotifications();
      } else {
        await refreshNotifications();
      }
    })();
    return onNotificationOpened(onOpenGroup);
    // Se arma una sola vez: onOpenGroup solo navega.
  }, []);
}

// Interruptor de Perfil.
export function useNotificationsSetting() {
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    void getNotificationsChoice().then((choice) => setEnabled(choice === 'on'));
  }, []);

  async function toggle(value: boolean) {
    if (busy) {
      return;
    }
    setError(undefined);
    setShowSettings(false);
    setBusy(true);
    if (value) {
      const result = await enableNotifications();
      setEnabled(result.ok);
      if (!result.ok) {
        setError(result.error);
        setShowSettings(!!result.openSettings);
      }
    } else {
      setEnabled(false);
      await disableNotifications();
    }
    setBusy(false);
  }

  return { enabled, toggle, error, showSettings, openSettings: openNotificationSettings };
}
