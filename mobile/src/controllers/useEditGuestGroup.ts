import { useEffect, useState } from 'react';

import { familyName, familySurname, GuestGroup, isSingleGuest } from '../models/Guest';
import { ApiError } from '../services/apiClient';
import { getMyEvent } from '../services/eventService';
import { deleteGuestGroup, listGuestGroups, updateGuestGroup } from '../services/guestService';
import { buildInviteLink, copyText, sendInvite } from '../services/shareService';
import { isoDateToShortDisplay } from '../utils/date';
import { isValidPhone } from '../utils/validation';
import { MAX_PEOPLE_PER_GROUP } from './useAddGuestGroup';

type FieldErrors = {
  name?: string;
  phone?: string;
  people?: string;
};

// Una persona en el formulario. id está si ya existía (así se conserva su respuesta).
type PersonField = { key: string; id?: string; name: string };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

let nextKey = 0;
function newKey() {
  nextKey += 1;
  return `nueva-${nextKey}`;
}

// Mensaje que se manda con el link. Va en plural o en voseo según cuántas personas son,
// y menciona la fecha límite para confirmar si los novios la cargaron.
function inviteMessage(
  group: GuestGroup,
  coupleNames: string | null,
  rsvpDeadline: string | null,
  link: string,
) {
  const plural = group.guests.length > 1;
  const opening = coupleNames ? `Somos ${coupleNames}: nos casamos` : 'Nos casamos';
  const deadline = rsvpDeadline ? ` antes del ${isoDateToShortDisplay(rsvpDeadline)}` : '';
  const confirm = plural
    ? `Por favor, confirmen su asistencia${deadline} completando el formulario de la invitación. ¡Los esperamos!`
    : `Por favor, confirmá tu asistencia${deadline} completando el formulario de la invitación. ¡Te esperamos!`;
  return `¡Hola, ${group.name}! ${opening} y queremos compartirlo con ${plural ? 'ustedes' : 'vos'}. Esta es la invitación:\n${link}\n\n${confirm}`;
}

// Lógica de la pantalla de un grupo: compartir su link, editar sus datos y borrarlo.
// onDone se llama después de guardar o borrar.
export function useEditGuestGroup(groupId: string, onDone: () => void) {
  const [group, setGroup] = useState<GuestGroup | null>(null);
  const [coupleNames, setCoupleNames] = useState<string | null>(null);
  const [rsvpDeadline, setRsvpDeadline] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>();

  // Alguien que va solo se edita como una persona: el nombre del grupo sigue al de la persona.
  const [single, setSingle] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState<PersonField[]>([]);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [shareMessage, setShareMessage] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([listGuestGroups(), getMyEvent()])
      .then(([groups, event]) => {
        const found = groups.find((candidate) => candidate.id === groupId);
        if (!found) {
          throw new ApiError('No encontramos esa familia.', 404);
        }
        setGroup(found);
        setCoupleNames(event?.coupleNames ?? null);
        setRsvpDeadline(event?.rsvpDeadline ?? null);
        setSingle(isSingleGuest(found));
        // En las familias se edita solo el apellido; "Familia" va fijo en el campo.
        setName(isSingleGuest(found) ? found.name : familySurname(found.name));
        setPhone(found.phone ?? '');
        setPeople(found.guests.map((guest) => ({ key: guest.id, id: guest.id, name: guest.name })));
      })
      .catch((error) => setLoadError(errorMessage(error, 'No pudimos cargar la familia.')))
      .finally(() => setLoading(false));
  }, [groupId]);

  const link = group ? buildInviteLink(group.inviteToken) : null;
  const LINK_MISSING = 'Falta configurar la dirección de la invitación (EXPO_PUBLIC_INVITE_URL). Reiniciá Expo.';

  async function handleSend() {
    if (!group) {
      return;
    }
    setShareMessage(undefined);
    if (!link) {
      setShareMessage(LINK_MISSING);
      return;
    }
    try {
      await sendInvite(inviteMessage(group, coupleNames, rsvpDeadline, link), group.phone);
    } catch {
      setShareMessage('No pudimos abrir WhatsApp. Copiá el link y mandalo vos.');
    }
  }

  async function handleCopy() {
    if (!link) {
      setShareMessage(LINK_MISSING);
      return;
    }
    await copyText(link);
    setShareMessage('Link copiado.');
  }

  function setPerson(key: string, value: string) {
    setPeople((current) => current.map((person) => (person.key === key ? { ...person, name: value } : person)));
  }

  function addPerson() {
    setPeople((current) =>
      current.length < MAX_PEOPLE_PER_GROUP ? [...current, { key: newKey(), name: '' }] : current,
    );
  }

  function removePerson(key: string) {
    setPeople((current) => (current.length > 1 ? current.filter((person) => person.key !== key) : current));
  }

  function validate() {
    const errors: FieldErrors = {};
    if (single ? !name.trim() : !familySurname(name)) {
      errors.name = single ? 'Escribí el nombre y apellido.' : 'Escribí el apellido de la familia.';
    }
    if (phone.trim() && !isValidPhone(phone.trim())) {
      errors.phone = 'Revisá el WhatsApp: escribí solo números, con el código de área.';
    }
    if (!single && !people.some((person) => person.name.trim())) {
      errors.people = 'Escribí el nombre de al menos una persona.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!group) {
      return;
    }
    setFormError(undefined);
    if (!validate()) {
      return;
    }
    setSaving(true);
    try {
      await updateGuestGroup(group.id, {
        name: single ? name.trim() : familyName(name),
        phone: phone.trim() || null,
        guests: single
          ? [{ id: group.guests[0].id, name: name.trim() }]
          : people
              .filter((person) => person.name.trim())
              .map((person) => ({ ...(person.id ? { id: person.id } : {}), name: person.name.trim() })),
      });
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos guardar los cambios. Intentá de nuevo.'));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!group) {
      return;
    }
    setFormError(undefined);
    setDeleting(true);
    try {
      await deleteGuestGroup(group.id);
      onDone();
    } catch (error) {
      setFormError(errorMessage(error, 'No pudimos borrar la familia. Intentá de nuevo.'));
      setDeleting(false);
    }
  }

  return {
    loading,
    loadError,
    group,
    single,
    link,
    hasPhone: !!group?.phone,
    shareMessage,
    handleSend,
    handleCopy,
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
    saving,
    deleting,
    handleSave,
    handleDelete,
  };
}
