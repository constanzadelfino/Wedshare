import { Href, Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  question: string;
  linkText: string;
  href: Href;
};

// Pie de las pantallas de acceso: "¿No tenés cuenta? Registrate".
export function FooterLink({ question, linkText, href }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{question} </Text>
      <Link href={href} replace style={styles.link} accessibilityRole="link">
        {linkText}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.textSecondary,
  },
  // El área táctil del link llega a 44 px de alto.
  link: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.accentText,
    paddingVertical: 12,
  },
});
