import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';
import { FooterLink } from '../../components/FooterLink';
import { OrDivider } from '../../components/OrDivider';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { text } from '../../theme/typography';

export default function RegistroScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

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
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
        />
      </View>

      <View style={styles.actions}>
        <Button title="Crear cuenta" />
        <OrDivider />
        <Button title="Continuar con Google" variant="secondary" />
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
