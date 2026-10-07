import { StyleSheet, View } from 'react-native';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';

import { TemplateInfo } from '../models/Template';

// Miniatura de la portada de cada plantilla (pantalla 09 del diseño): un dibujo simple con sus
// colores y su forma, sin fotos ni datos reales.
export function TemplateThumbnail({ template }: { template: TemplateInfo }) {
  const { cover, background, accent, ink } = template.colors;

  return (
    <View style={[styles.box, { backgroundColor: background }]} accessibilityElementsHidden importantForAccessibility="no">
      <Svg width="100%" height={128} viewBox="0 0 160 128" preserveAspectRatio="xMidYMid slice">
        <Rect width={160} height={128} fill={cover} />
        {template.id === 'dorado' && (
          <>
            <Path d="M58 92V52a22 22 0 0 1 44 0v40z" fill="none" stroke={accent} strokeWidth={1.2} />
            <Rect x={50} y={101} width={60} height={3} rx={1.5} fill={ink} />
            <Rect x={62} y={109} width={36} height={3} rx={1.5} fill={accent} />
          </>
        )}
        {template.id === 'rosa' && (
          <>
            <Path d="M0 0h160v62c0 22-30 34-80 34S0 84 0 62z" fill="#E4B4AE" />
            <Rect x={30} y={78} width={100} height={34} rx={8} fill="#FFFDF8" stroke={accent} strokeWidth={1} />
            <Rect x={52} y={88} width={56} height={3} rx={1.5} fill={ink} />
            <Path d="M70 100q5-5 10 0q5 5 10 0" fill="none" stroke={accent} strokeWidth={1.2} />
          </>
        )}
        {template.id === 'noche' && (
          <>
            <Path d="M80 22l26 26-26 26-26-26z" fill="none" stroke={accent} strokeWidth={1.2} />
            <Path d="M80 16l32 32-32 32-32-32z" fill="none" stroke={accent} strokeWidth={0.7} />
            <SvgText x={80} y={53} textAnchor="middle" fontSize={13} fill={ink}>
              S&amp;M
            </SvgText>
            <Rect x={52} y={94} width={56} height={3} rx={1.5} fill={ink} />
            <Path d="M50 108h24M86 108h24" stroke={accent} strokeWidth={1} />
            <Path d="M80 105l3 3-3 3-3-3z" fill={accent} />
          </>
        )}
        {template.id === 'minimal' && (
          <>
            <Rect x={20} y={20} width={64} height={6} rx={1} fill={ink} />
            <Rect x={20} y={32} width={44} height={6} rx={1} fill={ink} />
            <Rect x={20} y={46} width={120} height={1} fill={ink} />
            <Rect x={20} y={56} width={120} height={60} fill="#D9D9D9" />
          </>
        )}
      </Svg>
      <View style={styles.pills}>
        {[0, 1, 2].map((index) => (
          <View key={index} style={[styles.pill, { borderColor: accent }, template.id !== 'dorado' && template.id !== 'rosa' && styles.square]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
  },
  pills: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  pill: {
    width: 22,
    height: 9,
    borderRadius: 5,
    borderWidth: 1,
  },
  square: {
    borderRadius: 0,
  },
});
