import { useState } from 'react';
import { Text } from 'react-native';

import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { text } from '../../theme/typography';

// Pantalla mínima, sin diseño propio: sigue el estilo de Registro. Se perfecciona más adelante.
export default function RecuperarContrasenaScreen() {
  const [email, setEmail] = useState('');

  return (
    <Screen topSpacing={56} gap={24}>
      <ScreenHeader title="Recuperar contraseña" />

      <Text style={text.body}>
        Escribí el email con el que te registraste y te vamos a mandar un link para crear una
        contraseña nueva.
      </Text>

      <TextField
        label="Email"
        placeholder="tu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="send"
      />

      <Button title="Enviar link" />
    </Screen>
  );
}
