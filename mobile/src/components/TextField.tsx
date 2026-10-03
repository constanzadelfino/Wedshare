import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts, radius, text } from '../theme/typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, style, multiline, ...inputProps },
  ref,
) {
  return (
    <View style={styles.container}>
      <Text style={text.label}>{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={label}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    backgroundColor: colors.card,
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  // Para textos largos, como el mensaje de bienvenida.
  multiline: {
    height: undefined,
    minHeight: 104,
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.error,
  },
});
