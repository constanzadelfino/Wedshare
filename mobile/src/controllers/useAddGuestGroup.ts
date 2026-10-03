import { useState } from 'react';

import { ApiError } from '../services/apiClient';
import { createGuestGroup } from '../services/guestService';
import { isValidPhone } from '../utils/validation';

export const MAX_PEOPLE_PER_GROUP = 20;

type FieldErrors = {
  name?: string;
  phone?: string;
  people?: string;
};

// Lógica de la pantalla Agregar invitados: un grupo con su nombre, un WhatsApp opcional
// y la lista de personas. onSaved se llama cuando el grupo quedó guardado.
export function useAddGuestGroup(onSaved: () => void) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState(['']);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

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
    if (!name.trim()) {
      errors.name = 'Escribí el nombre del grupo.';
    }
    if (phone.trim() && !isValidPhone(phone.trim())) {
      errors.phone = 'Revisá el WhatsApp: escribí solo números, con el código de área.';
    }
    if (!people.some((person) => person.trim())) {
      errors.people = 'Escribí el nombre de al menos una persona.';
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
      await createGuestGroup({
        name: name.trim(),
        phone: phone.trim() || null,
        guests: people.map((person) => person.trim()).filter(Boolean),
      });
      onSaved();
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo en unos minutos.',
      );
      setLoading(false);
    }
  }

  return {
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
