import { StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fonts, radius } from '../theme/typography';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

// Campo de búsqueda con lupa, como "Buscar invitado".
export function SearchField({ value, onChangeText, placeholder }: Props) {
  return (
    <View>
      <View style={styles.icon} pointerEvents="none">
        <Svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.textSecondary}
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Circle cx={11} cy={11} r={8} />
          <Path d="M21 21l-4.3-4.3" />
        </Svg>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={placeholder}
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 16,
    top: 15,
    zIndex: 1,
  },
  input: {
    height: 52,
    paddingLeft: 46,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    backgroundColor: colors.card,
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
});
