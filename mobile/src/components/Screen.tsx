import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

type Props = {
  children: ReactNode;
  // Espacio desde el borde superior de la pantalla, como en el diseño (390 × 844).
  topSpacing: number;
  gap: number;
  // Contenido que va abajo de todo, como "¿No tenés cuenta? Registrate".
  footer?: ReactNode;
};

export function Screen({ children, topSpacing, gap, footer }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(topSpacing, insets.top + 12),
            paddingBottom: Math.max(28, insets.bottom + 12),
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap }}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 32,
  },
});
