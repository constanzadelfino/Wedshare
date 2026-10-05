import { useState } from 'react';

import { familyName, familySurname } from '../models/Guest';
import { ApiError } from '../services/apiClient';
import { createGuestGroup } from '../services/guestService';
import { isValidPhone } from '../utils/validation';

export const MAX_PEOPLE_PER_GROUP = 20;

// "single": una persona que va sola. "group": una familia (su nombre empieza con "Familia").
// Por dentro, una persona sola es un grupo de una persona con su mismo nombre.
export type AddMode = 'single' | 'group';

type FieldErrors = {
  name?: string;
  person?: string;
  phone?: string;
  people?: string;
};

// Lógica de la pantalla Agregar invitados. onSaved se llama cuando quedó guardado.
export function useAddGuestGroup(onSaved: () => void) {
  const [mode, setMode] = useState<AddMode>('single');
  // Solo para "Una persona".
  const [personName, setPersonName] = useState('');
  // Solo para "Grupo o familia".
  const [name, setName] = useState('');
  const [people, setPeople] = useState(['']);
  const [phone, setPhone] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function changeMode(value: AddMode) {
    setMode(value);
    setFieldErrors({});
    setFormError(undefined);
  }

  function setPerson(index: number, value: string) {
    setPeople((current) => current.map((person, i) => (i === index ? value : person)));
  }

  function addPerson() {
    setPeople((current) => (current.length < MAX_PEOPLE_PER_GROUP ? [...current, ''] : current));
  }

  function removePerson(index: number) {
    setPeople((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : current));
  }

  function validate() {
    const errors: FieldErrors = {};
    if (mode === 'single') {
      if (!personName.trim()) {
        errors.person = 'Escribí el nombre y apellido.';
      }
    } else {
      if (!familySurname(name)) {
        errors.name = 'Escribí el apellido de la familia.';
      }
      if (!people.some((person) => person.trim())) {
        errors.people = 'Escribí el nombre de al menos una persona.';
      }
    }
    if (phone.trim() && !isValidPhone(phone.trim())) {
      errors.phone = 'Revisá el WhatsApp: escribí solo números, con el código de área.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    setFormError(undefined);
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await createGuestGroup(
        mode === 'single'
          ? { name: personName.trim(), phone: phone.trim() || null, guests: [personName.trim()] }
          : {
              name: familyName(name),
              phone: phone.trim() || null,
              guests: people.map((person) => person.trim()).filter(Boolean),
            },
      );
      onSaved();
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo en unos minutos.',
      );
      setLoading(false);
    }
  }

  return {
    mode,
    setMode: changeMode,
    personName,
    setPersonName,
    name,
    setName,
    phone,
    setPhone,
    people,
    setPerson,
    addPerson,
    removePerson,
    canAddPerson: people.length < MAX_PEOPLE_PER_GROUP,
    fieldErrors,
    formError,
    loading,
    handleSave,
  };
}
