import { StyleSheet, Text, View } from 'react-native';

import { text } from '../theme/typography';
import { BackButton } from './BackButton';
import { Logo } from './Logo';

type Props = {
  title: string;
  // Algunas pantallas del diseño, como Crear evento, no llevan el logo.
  showLogo?: boolean;
};

// Encabezado de las pantallas secundarias: volver, título y logo chico.
export function ScreenHeader({ title, showLogo = true }: Props) {
  return (
    <View style={styles.row}>
      <BackButton />
      <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
        {title}
      </Text>
      {showLogo ? <Logo width={34} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  title: {
    flex: 1,
  },
});
