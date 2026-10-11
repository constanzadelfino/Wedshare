import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useDeleteAccount } from '../../controllers/useDeleteAccount';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// "Eliminar mi cuenta" desde Perfil (sin diseño propio). Google Play y la App Store piden que
// las apps con registro dejen borrar la cuenta desde la app. Explica qué se borra y pide confirmación.
export default function EliminarCuentaScreen() {
  const account = useDeleteAccount();

  function confirmDelete() {
    Alert.alert('Eliminar mi cuenta', 'Se borran tu cuenta y tu casamiento, y no se pueden recuperar.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: account.handleDelete },
    ]);
  }

  return (
    <Screen topSpacing={56} gap={24}>
      <ScreenHeader title="Eliminar mi cuenta" />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Se borra todo lo que cargaste</Text>
        <Text style={text.body}>
          Tu casamiento con sus eventos, los invitados y sus respuestas, los regalos y las fotos. Los links
          que mandaste dejan de funcionar y los pases de ingreso ya no se pueden escanear.
        </Text>
      </View>
      <Text style={text.body}>Esto no se puede deshacer. Si querés volver a usar Wedshare, vas a tener que crear una cuenta nueva.</Text>

      <View style={styles.actions}>
        <FormError message={account.error} />
        <Button title="Eliminar mi cuenta" loading={account.deleting} onPress={confirmDelete} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 6,
    padding: 16,
    backgroundColor: colors.declinedBackground,
    borderRadius: 16,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.declinedText,
  },
  actions: {
    gap: 14,
  },
});
