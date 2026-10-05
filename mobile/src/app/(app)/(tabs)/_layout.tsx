import { router } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/typography';

type IconProps = { color: ColorValue };

function iconSvgProps(color: ColorValue) {
  return {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
}

function HomeIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
    </Svg>
  );
}

function GuestsIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Circle cx={9} cy={7} r={4} />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  );
}

function QrIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Rect x={3} y={3} width={7} height={7} />
      <Rect x={14} y={3} width={7} height={7} />
      <Rect x={3} y={14} width={7} height={7} />
      <Path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
    </Svg>
  );
}

function InvitationIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Rect x={2} y={4} width={20} height={16} rx={2} />
      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
}

function ProfileIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
}

// Barra de pestañas de abajo: Inicio, Invitados, QR, Invitación y Perfil. Invitación ocupa el
// lugar que el diseño le daba a Playlist, que ahora está adentro (pedido de Constanza).
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(16, insets.bottom);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 68 + bottomPadding,
          paddingTop: 6,
          paddingBottom: bottomPadding,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.semiBold,
          fontStyle: 'normal',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
      />
      <Tabs.Screen
        name="invitados"
        options={{ title: 'Invitados', tabBarIcon: ({ color }) => <GuestsIcon color={color} /> }}
      />
      {/* El escáner ocupa toda la pantalla (sin la barra), así que la pestaña lo abre encima. */}
      <Tabs.Screen
        name="qr"
        options={{ title: 'QR', tabBarIcon: ({ color }) => <QrIcon color={color} /> }}
        listeners={{
          tabPress: (event) => {
            event.preventDefault();
            router.push('/escanear');
          },
        }}
      />
      <Tabs.Screen
        name="invitacion"
        options={{ title: 'Invitación', tabBarIcon: ({ color }) => <InvitationIcon color={color} /> }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => <ProfileIcon color={color} /> }}
      />
    </Tabs>
  );
}
