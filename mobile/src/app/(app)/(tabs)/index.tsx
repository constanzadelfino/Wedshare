import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/Button';
import { FormError } from '../../../components/FormError';
import { Logo } from '../../../components/Logo';
import { Screen } from '../../../components/Screen';
import { useAuth } from '../../../context/AuthContext';
import { useEvents } from '../../../controllers/useEvents';
import { useSignOut } from '../../../controllers/useSignOut';
import { colors } from '../../../theme/colors';
import { fonts, text } from '../../../theme/typography';
import { isoDateToDisplay } from '../../../utils/date';

// Inicio provisorio para probar el ingreso y el evento. Se reemplaza por la pantalla 03 del diseño.
export default function InicioScreen() {
  const { user } = useAuth();
  const { loading, error, handleSignOut } = useSignOut();
  const events = useEvents();

  return (
    <Screen topSpacing={88} gap={24}>
      <View style={styles.header}>
        <Logo width={44} />
        <Text style={styles.title} accessibilityRole="header">
          {user?.name ? `Hola, ${user.name}` : 'Hola'}
        </Text>
        <Text style={text.body}>Ingresaste como {user?.email}.</Text>
      </View>

      <Text style={text.body}>
        Esta pantalla es provisoria. Acá va a estar el inicio, con la cuenta regresiva y las
        confirmaciones.
      </Text>

      <View style={styles.events}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Tu evento
        </Text>
        {events.loading ? (
          <ActivityIndicator color={colors.accent} />
        ) : events.error ? (
          <FormError message={events.error} />
        ) : events.events.length === 0 ? (
          <Text style={text.body}>Todavía no creaste tu evento.</Text>
        ) : (
          events.events.map((event) => (
            <View key={event.id} style={styles.card}>
              <Text style={styles.cardTitle}>{event.name}</Text>
              <Text style={text.body}>
                {isoDateToDisplay(event.date)} · {event.venue}
              </Text>
            </View>
          ))
        )}
        {/* Cada cuenta tiene un solo casamiento: el botón se muestra solo si todavía no lo creó. */}
        {!events.loading && !events.error && events.events.length === 0 ? (
          <Button title="Crear evento" onPress={() => router.push('/crear-evento')} />
        ) : null}
      </View>

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
  events: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 20,
    color: colors.text,
  },
  card: {
    gap: 4,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
});
