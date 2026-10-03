import { router } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { ToggleRow } from '../../components/ToggleRow';
import { useCreateEvent } from '../../controllers/useCreateEvent';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: colors.accent,
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function CrearEventoScreen() {
  const form = useCreateEvent(() => router.back());
  const dateRef = useRef<TextInput>(null);
  const venueRef = useRef<TextInput>(null);

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        <View style={styles.footer}>
          <FormError message={form.formError} />
          <Button title="Crear evento" loading={form.loading} onPress={form.handleCreate} />
        </View>
      }
    >
      <ScreenHeader title="Nuevo evento" showLogo={false} />

      <View style={styles.fields}>
        <TextField
          label="Nombre del evento"
          placeholder="Ej: Casamiento de [Nombre] y [Nombre]"
          value={form.name}
          onChangeText={form.setName}
          error={form.fieldErrors.name}
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() => dateRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={dateRef}
          label="Fecha"
          placeholder="DD/MM/AAAA"
          value={form.date}
          onChangeText={form.setDate}
          error={form.fieldErrors.date}
          keyboardType="number-pad"
          maxLength={10}
          returnKeyType="next"
          onSubmitEditing={() => venueRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextField
          ref={venueRef}
          label="Lugar"
          placeholder="Salón o dirección"
          value={form.venue}
          onChangeText={form.setVenue}
          error={form.fieldErrors.venue}
          autoCapitalize="sentences"
          returnKeyType="done"
        />
      </View>

      <ToggleRow
        title="Google Calendar"
        subtitle="Se actualiza si cambia la fecha"
        value={form.calendarSync}
        onChange={form.setCalendarSync}
        icon={
          <Svg {...iconProps}>
            <Rect x={3} y={4} width={18} height={18} rx={2} />
            <Path d="M16 2v4M8 2v4M3 10h18" />
          </Svg>
        }
      />

      <View style={styles.modules}>
        <Text style={styles.sectionLabel}>Módulos opcionales</Text>
        <ToggleRow
          title="Playlist del DJ"
          value={form.playlistEnabled}
          onChange={form.setPlaylistEnabled}
          icon={
            <Svg {...iconProps}>
              <Path d="M9 18V5l12-2v13" />
              <Circle cx={6} cy={18} r={3} />
              <Circle cx={18} cy={16} r={3} />
            </Svg>
          }
        />
        <ToggleRow
          title="Lista de regalos"
          value={form.giftsEnabled}
          onChange={form.setGiftsEnabled}
          icon={
            <Svg {...iconProps}>
              <Rect x={3} y={8} width={18} height={4} />
              <Path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
            </Svg>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 14,
  },
  modules: {
    gap: 8,
  },
  sectionLabel: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 1.56,
    textTransform: 'uppercase',
    color: colors.accentText,
  },
  footer: {
    width: '100%',
    gap: 14,
  },
});
