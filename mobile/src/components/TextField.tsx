import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '../theme/colors';
import { fonts, radius, text } from '../theme/typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
  // Texto fijo al principio del campo, que no se puede borrar. Ej: "Familia".
  prefix?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, style, multiline, prefix, ...inputProps },
  ref,
) {
  const input = (
    <TextInput
      ref={ref}
      placeholderTextColor={colors.placeholder}
      accessibilityLabel={prefix ? `${label}, después de ${prefix}` : label}
      multiline={multiline}
      style={
        prefix
          ? [styles.text, styles.prefixedInput, style]
          : [styles.text, styles.input, multiline && styles.multiline, error ? styles.inputError : null, style]
      }
      {...inputProps}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={text.label}>{label}</Text>
      {prefix ? (
        <View style={[styles.input, styles.prefixRow, error ? styles.inputError : null]}>
          <Text style={[styles.text, styles.prefix]} accessibilityElementsHidden importantForAccessibility="no">
            {prefix}
          </Text>
          {input}
        </View>
      ) : (
        input
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  text: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    backgroundColor: colors.card,
  },
  prefixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prefix: {
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
  },
  prefixedInput: {
    flex: 1,
    height: '100%',
    padding: 0,
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
