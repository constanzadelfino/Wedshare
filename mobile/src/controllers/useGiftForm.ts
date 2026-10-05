import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { Event } from '../models/Event';
import { GiftMethod, GiftType } from '../models/Gift';
import { ApiError } from '../services/apiClient';
import { getMyEvent, updateEvent } from '../services/eventService';
import { createGift, deleteGift, listGifts, updateGift } from '../services/giftService';
import { formatPriceInput, parsePriceInput } from '../utils/money';
import { BANK_ALIAS_PATTERN } from '../utils/validation';

// Al agregar, el formulario va por pasos: qué regalo, cuánto sale y cómo se regala.
export const GIFT_FORM_STEPS = 3;

type FieldErrors = {
  name?: string;
  url?: string;
  alias?: string;
  cbu?: string;
};

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

function isValidUrl(value: string) {
  return /^https?:\/\/\S+\.\S+/i.test(value);
}

// Lógica del formulario de un regalo. Si recibe giftId, edita (todo en una pantalla);
// si no, crea uno nuevo por pasos. La cuenta bancaria es del evento y se edita desde Regalos;
// si todavía no hay, se completa en el último paso al elegir Transferencia.
export function useGiftForm(giftId: string | undefined, onDone: () => void) {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [event, setEvent] = useState<Event | null>(null);
  const [step, setStep] = useState(1);

  const [type, setType] = useState<GiftType>('other');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [method, setMethod] = useState<GiftMethod>('transfer');
  const [url, setUrl] = useState('');
  const [given, setGiven] = useState(false);
  const [bank, setBank] = useState('');
  const [holder, setHolder] = useState('');
  const [alias, setAlias] = useState('');
  const [cbu, setCbu] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([getMyEvent(), giftId ? listGifts() : Promise.resolve([])])
      .then(([myEvent, gifts]) => {
        if (!myEvent) {
          throw new ApiError('Primero creá tu evento.', 404);
        }
        setEvent(myEvent);
        setBank(myEvent.giftBank ?? '');
        setHolder(myEvent.giftHolder ?? '');
        setAlias(myEvent.giftAlias ?? '');
        setCbu(myEvent.giftCbu ?? '');
        if (!giftId) {
          return;
        }
        const gift = gifts.find((candidate) => candidate.id === giftId);
        if (!gift) {
          throw new ApiError('No encontramos ese regalo.', 404);
        }
        setType(gift.type);
        setName(gift.name);
        setPrice(gift.price ? formatPriceInput(String(gift.price)) : '');
        setMethod(gift.method);
        setUrl(gift.url ?? '');
        setGiven(gift.given);
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar el regalo.')))
      .finally(() => setLoading(false));
  }, [giftId]);

  // Al volver de cambiar la cuenta, se trae de nuevo para que el resumen esté al día.
  useFocusEffect(
    useCallback(() => {
      if (loading) {
        return;
      }
      getMyEvent()
        .then((myEvent) => myEvent && setEvent(myEvent))
        .catch(() => {});
    }, [loading]),
  );

  // Hay una cuenta guardada (alias o CBU): los regalos por transferencia la usan sin pedir datos.
  const hasSavedBank = !!(event?.giftAlias || event?.giftCbu);

  // Revisa los campos de un paso (o de todos, al editar). Devuelve true si están bien.
  function validate(stepToCheck: number | 'all') {
    const errors: FieldErrors = {};
    const checks = (n: number) => stepToCheck === 'all' || stepToCheck === n;
    if (checks(1) && !name.trim()) {
      errors.name = 'Escribí el nombre del regalo.';
    }
    if (checks(3)) {
      if (method === 'transfer' && !hasSavedBank) {
        const cbuDigits = cbu.replace(/\s/g, '');
        if (!alias.trim() && !cbuDigits) {
          errors.alias = 'Completá el alias o el CBU para que puedan transferirles.';
        } else if (alias.trim() && !BANK_ALIAS_PATTERN.test(alias.trim())) {
          errors.alias = 'El alias tiene de 6 a 20 letras, números, puntos o guiones.';
        }
        if (cbuDigits && !/^\d{22}$/.test(cbuDigits)) {
          errors.cbu = 'El CBU o CVU tiene 22 números.';
        }
      } else if (method === 'transfer') {
        // Ya hay una cuenta guardada: no hace falta nada más.
      } else if (!url.trim()) {
        errors.url = 'Pegá el link de pago o del producto.';
      } else if (!isValidUrl(url.trim())) {
        errors.url = 'Revisá el link: tiene que empezar con https://.';
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (validate(step)) {
      setStep((current) => Math.min(current + 1, GIFT_FORM_STEPS));
    }
  }

  function back() {
    setFieldErrors({});
    setFormError(undefined);
    setStep((current) => Math.max(current - 1, 1));
  }

  // Si es la primera transferencia, guarda la cuenta que completaron en el paso 3.
  async function saveBankIfNew() {
    if (!event || method !== 'transfer' || hasSavedBank) {
      return;
    }
    const changes = {
      giftBank: bank.trim() || null,
      giftHolder: holder.trim() || null,
      giftAlias: alias.trim() || null,
      giftCbu: cbu.replace(/\s/g, '') || null,
    };
    setEvent(await updateEvent(event.id, changes));
  }

  async function handleSave() {
    setFormError(undefined);
    if (!validate('all')) {
      // Al agregar, el error puede estar en un paso anterior: se vuelve a ese paso.
      if (!giftId && !name.trim()) {
        setStep(1);
      }
      return;
    }
    setSaving(true);
    const data = {
      type,
      name: name.trim(),
      price: parsePriceInput(price),
      method,
      url: method === 'transfer' ? null : url.trim(),
      given,
    };
    try {
      await saveBankIfNew();
      if (giftId) {
        await updateGift(giftId, data);
      } else {
        await createGift(data);
      }
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos guardar el regalo. Intentá de nuevo.'));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!giftId) {
      return;
    }
    setFormError(undefined);
    setDeleting(true);
    try {
      await deleteGift(giftId);
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos borrar el regalo. Intentá de nuevo.'));
      setDeleting(false);
    }
  }

  return {
    isEditing: !!giftId,
    // Cuenta guardada, para mostrar el resumen en lugar de los campos.
    savedBank: hasSavedBank && event ? { alias: event.giftAlias, cbu: event.giftCbu } : null,
    loading,
    loadError,
    step,
    isLastStep: step === GIFT_FORM_STEPS,
    next,
    back,
    type,
    setType,
    name,
    setName,
    price,
    setPrice: (value: string) => setPrice(formatPriceInput(value)),
    method,
    setMethod: (value: GiftMethod) => {
      setMethod(value);
      setFieldErrors({});
    },
    url,
    setUrl,
    given,
    setGiven,
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
    deleting,
    handleSave,
    handleDelete,
  };
}
