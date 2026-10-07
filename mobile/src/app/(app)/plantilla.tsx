import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TemplateThumbnail } from '../../components/TemplateThumbnail';
import { useChooseTemplate } from '../../controllers/useChooseTemplate';
import { useInvitationPreview } from '../../controllers/useInvitationPreview';
import { TEMPLATES, TemplateInfo } from '../../models/Template';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Elegí una plantilla (pantalla 09 del diseño, sin los filtros por estilo: con cuatro plantillas
// no hacen falta). "Vista previa" muestra la invitación con la plantilla marcada sin guardarla.
// Con ?inicio=1 es el paso 2 de los primeros pasos: sin volver, con "Elegir después".
export default function PlantillaScreen() {
  const onboarding = useLocalSearchParams<{ inicio?: string }>().inicio === '1';
  const finishOnboarding = () => router.replace('/invitacion-lista');
  const choose = useChooseTemplate(onboarding ? finishOnboarding : () => router.back());
  const preview = useInvitationPreview(choose.event?.id);

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={
        choose.event ? (
          <View style={styles.footer}>
            <FormError message={choose.error ?? preview.error} />
            <View style={styles.footerRow}>
              <View style={styles.footerButton}>
                <Button
                  title="Vista previa"
                  variant="outline"
                  loading={preview.opening}
                  onPress={() => preview.openPreview(choose.selected)}
                  icon={<EyeIcon />}
                />
              </View>
              <View style={styles.footerButton}>
                <Button title="Usar plantilla" loading={choose.saving} onPress={choose.saveTemplate} />
              </View>
            </View>
            {onboarding ? (
              <Pressable onPress={finishOnboarding} accessibilityRole="button" style={styles.later}>
                <Text style={text.link}>Elegir después</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null
      }
    >
      {onboarding ? (
        <View style={styles.onboardingHeader}>
          <Text style={styles.step}>Paso 2 de 2</Text>
          <Text style={styles.title} accessibilityRole="header">
            Elegí una plantilla
          </Text>
        </View>
      ) : (
        <ScreenHeader title="Tu invitación" showLogo={false} />
      )}

      {choose.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : choose.loadError ? (
        <FormError message={choose.loadError} />
      ) : (
        <>
          <Text style={text.body}>
            {onboarding
              ? 'Después podés cambiarla, y también las fotos y los textos.'
              : 'Elegí una plantilla. Después podés cambiar fotos y textos.'}
          </Text>
          <View style={styles.grid} accessibilityRole="radiogroup">
            {TEMPLATES.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                selected={template.id === choose.selected}
                onPress={() => choose.select(template.id)}
              />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}

function TemplateCard({
  template,
  selected,
  onPress,
}: {
  template: TemplateInfo;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${template.name}, ${template.style}`}
      style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && styles.pressed]}
    >
      <TemplateThumbnail template={template} />
      <View style={styles.cardText}>
        <Text style={styles.cardName}>{template.name}</Text>
        <Text style={styles.cardStyle}>{template.style}</Text>
      </View>
      {selected ? (
        <View style={styles.check}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.card} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 12l5 5L20 7" />
          </Svg>
        </View>
      ) : null}
    </Pressable>
  );
}

function EyeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.accentText} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  card: {
    width: '48%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  pressed: {
    opacity: 0.85,
  },
  cardText: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 2,
  },
  cardName: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.text,
  },
  cardStyle: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  check: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    gap: 10,
  },
  later: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingHeader: {
    gap: 8,
  },
  step: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 13,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accentText,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.text,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
  },
});
