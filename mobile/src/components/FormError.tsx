import { StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Mensaje de error general del formulario, por ejemplo cuando la contraseña no es correcta.
export function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <Text style={styles.text} accessibilityRole="alert" accessibilityLiveRegion="polite">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: colors.error,
  },
});
