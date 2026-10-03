import { useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';

import { EntryPass, parseEntryQr } from '../models/Entry';
import { ApiError } from '../services/apiClient';
import { getEntryPass, registerEntry } from '../services/entryService';

// Qué muestra la tarjeta de abajo:
// scanning: nada, la cámara espera un QR; loading: buscando el QR;
// pass: el pase del grupo (para registrar o ya registrado); error: QR que no sirve.
type Step = 'scanning' | 'loading' | 'pass' | 'error';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica del escaneo en la entrada: leer el QR, mostrar para quiénes vale
// y registrar el ingreso de las personas que entran.
export function useEntryScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState<Step>('scanning');
  const [code, setCode] = useState<string>();
  const [pass, setPass] = useState<EntryPass>();
  // Personas marcadas para entrar ahora. Al escanear se marcan todas las que no entraron.
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [justRegistered, setJustRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string>();
  const [torchOn, setTorchOn] = useState(false);
  // La cámara avisa el mismo QR varias veces por segundo: se lee uno solo a la vez.
  const busy = useRef(false);

  // La primera vez se pide permiso para usar la cámara.
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain && permission.status === 'undetermined') {
      requestPermission();
    }
  }, [permission, requestPermission]);

  async function handleScan(data: string) {
    if (busy.current) {
      return;
    }
    busy.current = true;
    setError(undefined);
    setJustRegistered(false);

    const scannedCode = parseEntryQr(data);
    if (!scannedCode) {
      setError('Este QR no es una invitación de Wedshare.');
      setStep('error');
      return;
    }
    setCode(scannedCode);
    setStep('loading');
    try {
      const found = await getEntryPass(scannedCode);
      setPass(found);
      setSelectedIds(found.guests.filter((guest) => !guest.enteredAt).map((guest) => guest.id));
      setStep('pass');
    } catch (scanError) {
      setError(errorMessage(scanError, 'No pudimos revisar el QR. Intentá de nuevo.'));
      setStep('error');
    }
  }

  function toggleGuest(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selected) => selected !== id) : [...current, id],
    );
  }

  async function handleRegister() {
    if (!code || selectedIds.length === 0) {
      return;
    }
    setError(undefined);
    setRegistering(true);
    try {
      const updated = await registerEntry(code, selectedIds);
      setPass(updated);
      setSelectedIds([]);
      setJustRegistered(true);
    } catch (registerError) {
      setError(errorMessage(registerError, 'No pudimos registrar el ingreso. Intentá de nuevo.'));
    } finally {
      setRegistering(false);
    }
  }

  // Vuelve a la cámara para leer otro QR.
  function scanAgain() {
    setStep('scanning');
    setCode(undefined);
    setPass(undefined);
    setSelectedIds([]);
    setJustRegistered(false);
    setError(undefined);
    busy.current = false;
  }

  function handlePermission() {
    if (permission?.canAskAgain) {
      requestPermission();
    } else {
      Linking.openSettings();
    }
  }

  const guests = pass?.guests ?? [];
  const enteredCount = guests.filter((guest) => guest.enteredAt).length;

  return {
    permissionGranted: permission?.granted ?? false,
    permissionChecked: !!permission && permission.status !== 'undetermined',
    canAskPermission: permission?.canAskAgain ?? true,
    handlePermission,
    torchOn,
    toggleTorch: () => setTorchOn((current) => !current),
    scanning: step === 'scanning',
    step,
    pass,
    guests,
    enteredCount,
    // Nadie del grupo confirmó: el QR está desactivado.
    noOneConfirmed: !!pass && guests.length === 0,
    allEntered: guests.length > 0 && enteredCount === guests.length,
    selectedIds,
    toggleGuest,
    justRegistered,
    registering,
    error,
    handleScan,
    handleRegister,
    scanAgain,
  };
}
