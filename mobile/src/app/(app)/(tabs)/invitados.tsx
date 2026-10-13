import { router } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../../components/Button';
import { EmptyGuestsArt } from '../../../components/EmptyGuestsArt';
import { FilterChips } from '../../../components/FilterChips';
import { FormError } from '../../../components/FormError';
import { GuestGroupCard } from '../../../components/GuestGroupCard';
import { Screen } from '../../../components/Screen';
import { SearchField } from '../../../components/SearchField';
import { GuestFilter, useGuests } from '../../../controllers/useGuests';
import { isSingleGuest } from '../../../models/Guest';
import { colors } from '../../../theme/colors';
import { fonts, text } from '../../../theme/typography';

const FILTERS: { value: GuestFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'confirmed', label: 'Confirmados' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'declined', label: 'No asisten' },
];

export default function InvitadosScreen() {
  const guests = useGuests();
  const isEmpty = !guests.loading && !guests.error && !guests.noEvent && guests.groups.length === 0;

  return (
    <Screen
      topSpacing={56}
      gap={14}
      footer={
        isEmpty ? (
          <Button
            title="Agregar invitados"
            onPress={() => router.push('/agregar-invitados')}
            icon={
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.card}
                strokeWidth={2.2}
                strokeLinecap="round"
              >
                <Path d="M12 5v14M5 12h14" />
              </Svg>
            }
          />
        ) : null
      }
    >
      <View style={styles.header}>
        <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
          Invitados
        </Text>
        {guests.noEvent ? null : (
          <Pressable
            onPress={() => router.push('/agregar-invitados')}
            accessibilityRole="button"
            accessibilityLabel="Agregar invitados"
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          >
            <Svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.card}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M12 5v14M5 12h14" />
            </Svg>
          </Pressable>
        )}
      </View>

      {guests.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : guests.error ? (
        <FormError message={guests.error} />
      ) : guests.noEvent ? (
        <>
          <Text style={text.body}>Primero creá tu evento para poder agregar invitados.</Text>
          <Button title="Crear evento" onPress={() => router.push('/crear-evento')} />
        </>
      ) : isEmpty ? (
        <View style={styles.empty}>
          <EmptyGuestsArt />
          <Text style={styles.emptyTitle}>Tu lista de invitados empieza acá</Text>
          <Text style={[text.body, styles.emptyText]}>
            Sumá a cada persona o familia, y después les mandás la invitación por WhatsApp desde la app.
          </Text>
        </View>
      ) : (
        <>
          <SearchField
            value={guests.search}
            onChangeText={guests.setSearch}
            placeholder="Buscar invitado"
          />
          <FilterChips
            options={FILTERS.map((option) => ({
              ...option,
              label: `${option.label} ${guests.counts[option.value]}`,
            }))}
            value={guests.filter}
            onChange={guests.setFilter}
          />
          {guests.visibleGroups.length === 0 ? (
            <Text style={text.body}>No hay invitados que coincidan con la búsqueda.</Text>
          ) : (
            guests.visibleGroups.map((group) => (
              <GuestGroupCard
                key={group.id}
                name={group.name}
                total={group.guests.length}
                guests={group.visibleGuests}
                showHeader={!isSingleGuest(group)}
                onPress={() => router.push({ pathname: '/editar-grupo', params: { id: group.id } })}
              />
            ))
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  title: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  empty: {
    alignItems: 'center',
    gap: 10,
    marginTop: 48,
    paddingHorizontal: 8,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 28,
    color: colors.text,
    textAlign: 'center',
    maxWidth: 240,
  },
  emptyText: {
    textAlign: 'center',
  },
});
