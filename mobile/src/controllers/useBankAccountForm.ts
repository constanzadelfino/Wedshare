import { useEffect, useState } from 'react';

import { Event } from '../models/Event';
import { ApiError } from '../services/apiClient';
import { getMyEvent, updateEvent } from '../services/eventService';
import { BANK_ALIAS_PATTERN } from '../utils/validation';

type FieldErrors = {
  alias?: string;
  cbu?: string;
};

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

// Lógica del formulario de la cuenta para transferencias (alias, CBU, titular y banco).
// Es una sola cuenta por casamiento: la usan todos los regalos por transferencia.
export function useBankAccountForm(onDone: () => void) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [bank, setBank] = useState('');
  const [holder, setHolder] = useState('');
  const [alias, setAlias] = useState('');
  const [cbu, setCbu] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMyEvent()
      .then((myEvent) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setBank(myEvent.giftBank ?? '');
        setHolder(myEvent.giftHolder ?? '');
        setAlias(myEvent.giftAlias ?? '');
        setCbu(myEvent.giftCbu ?? '');
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar la cuenta.')))
      .finally(() => setLoading(false));
  }, []);

  function validate() {
    const errors: FieldErrors = {};
    if (alias.trim() && !BANK_ALIAS_PATTERN.test(alias.trim())) {
      errors.alias = 'El alias tiene de 6 a 20 letras, números, puntos o guiones.';
    }
    if (cbu && !/^\d{22}$/.test(cbu)) {
      errors.cbu = 'El CBU o CVU tiene 22 números.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!event) {
      return;
    }
    setFormError(undefined);
    if (!validate()) {
      return;
    }
    setSaving(true);
    try {
      await updateEvent(event.id, {
        giftBank: bank.trim() || null,
        giftHolder: holder.trim() || null,
        giftAlias: alias.trim() || null,
        giftCbu: cbu || null,
      });
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos guardar la cuenta. Intentá de nuevo.'));
      setSaving(false);
    }
  }

  return {
    loading,
    loadError,
    bank,
    setBank,
    holder,
    setHolder,
    alias,
    setAlias,
    cbu,
    // Solo números, hasta 22.
    setCbu: (value: string) => setCbu(value.replace(/\D/g, '').slice(0, 22)),
    fieldErrors,
    formError,
    saving,
    handleSave,
  };
}
