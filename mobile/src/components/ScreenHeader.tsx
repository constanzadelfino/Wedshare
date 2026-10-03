import { StyleSheet, Text, View } from 'react-native';

import { text } from '../theme/typography';
import { BackButton } from './BackButton';
import { Logo } from './Logo';

// Encabezado de las pantallas secundarias: volver, título y logo chico.
export function ScreenHeader({ title }: { title: string }) {
  return (
    <View style={styles.row}>
      <BackButton />
      <Text style={[text.screenTitle, styles.title]} accessibilityRole="header">
        {title}
      </Text>
      <Logo width={34} />
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
