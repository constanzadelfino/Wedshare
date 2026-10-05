import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { Button } from '../../../components/Button';
import { FormError } from '../../../components/FormError';
import { GiftTypeIcon } from '../../../components/GiftTypeIcon';
import { Logo } from '../../../components/Logo';
import { QuickAction, quickActionIconProps } from '../../../components/QuickAction';
import { Screen } from '../../../components/Screen';
import { useInvitationPreview } from '../../../controllers/useInvitationPreview';
import { useMyEvent } from '../../../controllers/useMyEvent';
import { colors } from '../../../theme/colors';
import { text } from '../../../theme/typography';

// Pestaña Invitación (no está en el diseño, pedido de Constanza): junta todo lo que se ve en la
// invitación, con "Ver mi invitación" bien a mano. Ocupa el lugar que el diseño le daba a Playlist.
export default function InvitacionScreen() {
  const { event, loading, error } = useMyEvent();
  const preview = useInvitationPreview(event?.id);

  return (
    <Screen topSpacing={64} gap={16}>
      <View style={styles.header}>
        <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
          Tu invitación
        </Text>
        <Logo width={34} />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : error ? (
        <FormError message={error} />
      ) : !event ? (
        <>
          <Text style={text.body}>Primero creá tu evento para armar la invitación.</Text>
          <Button title="Crear evento" onPress={() => router.push('/crear-evento')} />
        </>
      ) : (
        <>
          <Text style={text.body}>Así la ven tus invitados cuando abren su link.</Text>
          <Button title="Ver mi invitación" loading={preview.opening} onPress={preview.openPreview} />
          <FormError message={preview.error} />

          <View style={styles.list}>
            <QuickAction
              title="Datos del casamiento"
              description="Nombre, fecha y lugar"
              onPress={() => router.push({ pathname: '/crear-evento', params: { editar: '1' } })}
              icon={
                <Svg {...quickActionIconProps}>
                  <Rect x={3} y={4} width={18} height={18} rx={2} />
                  <Path d="M16 2v4M8 2v4M3 10h18" />
                </Svg>
              }
            />
            <QuickAction
              title="Portada"
              description="Nombres, fotos y bienvenida"
              onPress={() => router.push({ pathname: '/personalizar', params: { tab: 'cover' } })}
              icon={
                <Svg {...quickActionIconProps}>
                  <Rect x={3} y={3} width={18} height={18} rx={2} />
                  <Circle cx={9} cy={9} r={2} />
                  <Path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                </Svg>
              }
            />
            <QuickAction
              title="Eventos y dress code"
              description="Festejo, ceremonia y civil"
              onPress={() => router.push({ pathname: '/personalizar', params: { tab: 'events' } })}
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <Circle cx={12} cy={10} r={3} />
                </Svg>
              }
            />
            <QuickAction
              title="Historia y álbum"
              description="Su historia, fotos y frase final"
              onPress={() => router.push('/historia')}
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </Svg>
              }
            />
            <QuickAction
              title="Regalos"
              description="Regalos, cuenta y buzón"
              onPress={() => router.push('/regalos')}
              icon={<GiftTypeIcon type="other" color={colors.accent} />}
            />
            <QuickAction
              title="Playlist"
              description="Tu playlist de Spotify"
              onPress={() => router.push('/playlist')}
              icon={
                <Svg {...quickActionIconProps}>
                  <Path d="M9 18V5l12-2v13" />
                  <Circle cx={6} cy={18} r={3} />
                  <Circle cx={18} cy={16} r={3} />
                </Svg>
              }
            />
          </View>
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
  },
  title: {
    flex: 1,
  },
  list: {
    gap: 10,
    marginTop: 4,
  },
});
