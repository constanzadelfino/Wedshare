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

// Ícono de regalo de Lucide (licencia ISC), el mismo de "Otro" en GiftTypeIcon.
function GiftsIcon({ color }: IconProps) {
  return (
    <Svg {...iconSvgProps(color)}>
      <Rect x={3} y={8} width={18} height={4} />
      <Path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
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

// Barra de pestañas de abajo: Inicio, Invitados, Regalos, Invitación y Perfil. Invitación ocupa el
// lugar que el diseño le daba a Playlist, que ahora está adentro, y Regalos el de QR: el escáner
// se abre desde el Inicio (pedidos de Constanza).
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
      <Tabs.Screen
        name="regalos"
        options={{ title: 'Regalos', tabBarIcon: ({ color }) => <GiftsIcon color={color} /> }}
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
