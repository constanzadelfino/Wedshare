import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Logo } from '../../components/Logo';
import { Screen } from '../../components/Screen';
import { useAuth } from '../../context/AuthContext';
import { authErrorMessage } from '../../lib/authErrors';
import { supabase } from '../../lib/supabase';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Inicio provisorio para probar el ingreso. Se reemplaza por la pantalla 03 del diseño.
export default function InicioScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const name: string | undefined = session?.user.user_metadata?.full_name;

  async function handleSignOut() {
    setError(undefined);
    setLoading(true);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(authErrorMessage(signOutError));
      setLoading(false);
    }
  }

  return (
    <Screen topSpacing={88} gap={24}>
      <View style={styles.header}>
        <Logo width={44} />
        <Text style={styles.title} accessibilityRole="header">
          {name ? `Hola, ${name}` : 'Hola'}
        </Text>
        <Text style={text.body}>Ingresaste como {session?.user.email}.</Text>
      </View>

      <Text style={text.body}>
        Esta pantalla es provisoria. Acá va a estar el inicio, con la cuenta regresiva y las
        confirmaciones.
      </Text>

      <FormError message={error} />
      <Button title="Cerrar sesión" variant="secondary" loading={loading} onPress={handleSignOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
  },
  title: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38,
    color: colors.text,
  },
});
