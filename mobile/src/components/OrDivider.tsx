import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export function OrDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>o</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  label: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
});
