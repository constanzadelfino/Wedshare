import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts, radius, text } from '../theme/typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, style, ...inputProps },
  ref,
) {
  return (
    <View style={styles.container}>
      <Text style={text.label}>{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={label}
        style={[styles.input, error ? styles.inputError : null, style]}
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
