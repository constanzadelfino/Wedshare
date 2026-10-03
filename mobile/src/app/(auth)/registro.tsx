import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FooterLink } from '../../components/FooterLink';
import { FormError } from '../../components/FormError';
import { OrDivider } from '../../components/OrDivider';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { authErrorMessage, isValidEmail, MIN_PASSWORD_LENGTH } from '../../lib/authErrors';
import { supabase } from '../../lib/supabase';
import { text } from '../../theme/typography';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function RegistroScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  function validate() {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();
    if (!name.trim()) {
      errors.name = 'Escribí tu nombre.';
    }
    if (!trimmedEmail) {
      errors.email = 'Escribí tu email.';
    } else if (!isValidEmail(trimmedEmail)) {
      errors.email = 'Revisá el email: parece que no es válido.';
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignUp() {
    setFormError(undefined);
    if (!validate()) {
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      // El nombre queda en los datos del usuario, donde también lo guarda Google.
      options: { data: { full_name: name.trim() } },
    });
    // Si sale bien, la app pasa sola al Inicio porque se crea la sesión.
    if (error) {
      setFormError(authErrorMessage(error));
      setLoading(false);
    }
  }

  return (
    <Screen
      topSpacing={56}
      gap={24}
      footer={<FooterLink question="¿Ya tenés cuenta?" linkText="Ingresá" href="/login" />}
    >
      <ScreenHeader title="Creá tu cuenta" />

      <Text style={text.body}>
        Armá tu cuenta para organizar el casamiento y compartirlo con tus invitados.
      </Text>

      <View style={styles.fields}>
        <TextField
          label="Nombre"
          placeholder="Tu nombre"
          value={name}
          onChangeText={setName}
          error={fieldErrors.name}
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={emailRef}
          label="Email"
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          error={fieldErrors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={passwordRef}
          label="Contraseña"
          placeholder="Elegí una contraseña"
          value={password}
          onChangeText={setPassword}
          error={fieldErrors.password}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={handleSignUp}
        />
      </View>

      <View style={styles.actions}>
        <FormError message={formError} />
        <Button title="Crear cuenta" loading={loading} onPress={handleSignUp} />
        <OrDivider />
        <Button title="Continuar con Google" variant="secondary" disabled={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },
  actions: {
    gap: 14,
  },
});
