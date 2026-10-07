import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Logo } from '../../components/Logo';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { FIRST_STEPS_QUESTIONS, useFirstSteps } from '../../controllers/useFirstSteps';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';

// Textos de cada pregunta: el título, una ayuda corta y el campo.
const QUESTIONS = {
  names: {
    title: '¿Cómo se llaman?',
    help: 'Así van a aparecer en la invitación.',
    label: 'Sus nombres',
    placeholder: 'Ej: Sofía y Martín',
  },
  date: {
    title: '¿Cuándo es el casamiento?',
    help: 'Si todavía no está confirmada, poné una aproximada y la cambiás después.',
    label: 'Fecha',
    placeholder: 'DD/MM/AAAA',
  },
  venue: {
    title: '¿Dónde lo festejan?',
    help: 'El salón o la dirección. Después podés sumar la ceremonia y el civil.',
    label: 'Lugar',
    placeholder: 'Salón o dirección',
  },
} as const;

// Primeros pasos (onboarding después del registro, como lo hacen otras apps de casamiento):
// un saludo y después una pregunta por pantalla, con una barrita de progreso. Se puede dejar
// para más tarde. Sigue con Elegí una plantilla.
export default function PrimerosPasosScreen() {
  const form = useFirstSteps();

  if (!form.question) {
    return (
      <Screen
        topSpacing={96}
        gap={16}
        footer={
          <View style={styles.footer}>
            <Button title="Empezar" onPress={form.next} />
            <Pressable onPress={form.later} accessibilityRole="button" style={styles.textButton}>
              <Text style={text.link}>Más tarde</Text>
            </Pressable>
          </View>
        }
      >
        <Logo width={52} />
        <Text style={styles.title} accessibilityRole="header">
          {form.firstName ? `Te damos la bienvenida, ${form.firstName}` : 'Te damos la bienvenida'}
        </Text>
        <Text style={text.body}>
          Contanos un poco de su casamiento y preparamos tu invitación. Son tres preguntas, y después
          podés cambiar todo.
        </Text>
      </Screen>
    );
  }

  const question = QUESTIONS[form.question];
  const value = form.question === 'names' ? form.names : form.question === 'date' ? form.date : form.venue;
  const onChange =
    form.question === 'names' ? form.setNames : form.question === 'date' ? form.setDate : form.setVenue;

  return (
    <Screen
      topSpacing={56}
      gap={22}
      footer={
        <View style={styles.footer}>
          <FormError message={form.formError} />
          <Button title="Siguiente" loading={form.loading} onPress={form.next} />
        </View>
      }
    >
      <View style={styles.topBar}>
        <Pressable onPress={form.back} accessibilityRole="button" accessibilityLabel="Volver" style={styles.back}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 18l-6-6 6-6" />
          </Svg>
        </Pressable>
        <View
          style={styles.progress}
          accessible
          accessibilityLabel={`Pregunta ${form.step} de ${FIRST_STEPS_QUESTIONS.length}`}
        >
          {FIRST_STEPS_QUESTIONS.map((item, index) => (
            <View key={item} style={[styles.segment, index < form.step && styles.segmentDone]} />
          ))}
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {question.title}
        </Text>
        <Text style={text.body}>{question.help}</Text>
      </View>

      {/* La key hace que cada pregunta tenga su propio campo y abra el teclado al aparecer. */}
      <TextField
        key={form.question}
        label={question.label}
        placeholder={question.placeholder}
        value={value}
        onChangeText={onChange}
        error={form.fieldError}
        autoFocus
        autoCapitalize={form.question === 'names' ? 'words' : 'sentences'}
        keyboardType={form.question === 'date' ? 'number-pad' : 'default'}
        maxLength={form.question === 'date' ? 10 : undefined}
        returnKeyType="next"
        onSubmitEditing={form.next}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.extraBold,
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.text,
  },
  header: {
    gap: 8,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  segmentDone: {
    backgroundColor: colors.accent,
  },
  footer: {
    width: '100%',
    gap: 10,
  },
  textButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
