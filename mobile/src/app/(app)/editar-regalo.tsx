import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { GiftTypeIcon } from '../../components/GiftTypeIcon';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { TextField } from '../../components/TextField';
import { ToggleRow } from '../../components/ToggleRow';
import { GIFT_FORM_STEPS, useGiftForm } from '../../controllers/useGiftForm';
import { GIFT_TYPES, GiftMethod } from '../../models/Gift';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';
import { maskCbu } from '../../utils/validation';

type Form = ReturnType<typeof useGiftForm>;

const METHOD_OPTIONS: { value: GiftMethod; label: string }[] = [
  { value: 'transfer', label: 'Transferencia' },
  { value: 'payment', label: 'Link de pago' },
  { value: 'product', label: 'Producto' },
];

// Pregunta de cada paso al agregar. Al editar, los mismos bloques llevan un título corto.
const STEP_QUESTIONS = ['¿Qué les gustaría que les regalen?', '¿Cuánto sale?', '¿Cómo se lo regalan?'];
const SECTION_TITLES = ['Regalo', 'Precio', 'Cómo se regala'];

// Nuevo regalo (pantalla 08b del diseño, guiada en 3 pasos) o editar uno (?id=, todo junto).
// En lugar de subir una foto, se elige el tipo de regalo y se muestra su ícono.
export default function EditarRegaloScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const form = useGiftForm(id, () => router.back());

  function confirmDelete() {
    Alert.alert('Borrar regalo', `¿Querés borrar "${form.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: form.handleDelete },
    ]);
  }

  const blocks = [<TypeBlock key="type" form={form} />, <PriceBlock key="price" form={form} />, <MethodBlock key="method" form={form} />];

  return (
    <Screen
      topSpacing={56}
      gap={18}
      footer={form.loading || form.loadError ? null : <Footer form={form} onDelete={confirmDelete} />}
    >
      <ScreenHeader title={form.isEditing ? 'Editar regalo' : 'Nuevo regalo'} showLogo={false} />

      {form.loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : form.loadError ? (
        <FormError message={form.loadError} />
      ) : form.isEditing ? (
        <>
          {blocks.map((block, index) => (
            <View key={index} style={styles.block}>
              <Text style={text.sectionLabel}>{SECTION_TITLES[index]}</Text>
              {block}
            </View>
          ))}
          {/* Wedshare no se entera de los pagos: los novios lo marcan a mano. */}
          <ToggleRow
            title="Ya nos lo regalaron"
            subtitle="En la invitación se ve como regalado"
            value={form.given}
            onChange={form.setGiven}
          />
        </>
      ) : (
        <View style={styles.block}>
          <View style={styles.progress} accessible accessibilityLabel={`Paso ${form.step} de ${GIFT_FORM_STEPS}`}>
            <Text style={text.sectionLabel}>
              Paso {form.step} de {GIFT_FORM_STEPS}
            </Text>
            <View style={styles.progressBar}>
              {Array.from({ length: GIFT_FORM_STEPS }, (_, index) => (
                <View
                  key={index}
                  style={[styles.progressSegment, index < form.step && styles.progressSegmentDone]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.question} accessibilityRole="header">
            {STEP_QUESTIONS[form.step - 1]}
          </Text>
          {blocks[form.step - 1]}
        </View>
      )}
    </Screen>
  );
}

function Footer({ form, onDelete }: { form: Form; onDelete: () => void }) {
  if (form.isEditing) {
    return (
      <View style={styles.footer}>
        <FormError message={form.formError} />
        <Button title="Guardar regalo" loading={form.saving} disabled={form.deleting} onPress={form.handleSave} />
        <Button title="Borrar regalo" variant="secondary" loading={form.deleting} disabled={form.saving} onPress={onDelete} />
      </View>
    );
  }
  return (
    <View style={styles.footer}>
      <FormError message={form.formError} />
      <View style={styles.footerRow}>
        {form.step > 1 ? (
          <View style={styles.footerButton}>
            <Button title="Atrás" variant="secondary" disabled={form.saving} onPress={form.back} />
          </View>
        ) : null}
        <View style={styles.footerButton}>
          {form.isLastStep ? (
            <Button title="Guardar regalo" loading={form.saving} onPress={form.handleSave} />
          ) : (
            <Button title="Siguiente" onPress={form.next} />
          )}
        </View>
      </View>
    </View>
  );
}

function TypeBlock({ form }: { form: Form }) {
  return (
    <View style={styles.block}>
      <View style={styles.typeGrid} accessibilityRole="radiogroup">
        {GIFT_TYPES.map((option) => {
          const selected = option.value === form.type;
          return (
            <Pressable
              key={option.value}
              onPress={() => form.setType(option.value)}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ selected }}
              style={({ pressed }) => [styles.typeOption, selected && styles.typeOptionSelected, pressed && styles.pressed]}
            >
              <GiftTypeIcon type={option.value} color={colors.accent} />
              <Text style={[styles.typeLabel, selected && styles.typeLabelSelected]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <TextField
        label="Nombre del regalo"
        placeholder="Ej: Cena romántica"
        value={form.name}
        onChangeText={form.setName}
        error={form.fieldErrors.name}
        autoCapitalize="sentences"
        maxLength={80}
      />
    </View>
  );
}

function PriceBlock({ form }: { form: Form }) {
  return (
    <View style={styles.block}>
      <TextField
        label="Precio (opcional)"
        placeholder="$ 0"
        value={form.price ? `$ ${form.price}` : ''}
        onChangeText={form.setPrice}
        keyboardType="number-pad"
      />
      <Text style={styles.hint}>Podés dejarlo vacío si no tiene un precio fijo.</Text>
    </View>
  );
}

function MethodBlock({ form }: { form: Form }) {
  return (
    <View style={styles.block}>
      <SegmentedTabs options={METHOD_OPTIONS} value={form.method} onChange={form.setMethod} />
      {form.method === 'transfer' && form.savedBank ? (
        <View style={styles.savedBank}>
          <View style={styles.savedBankTexts}>
            <Text style={styles.savedBankTitle}>Se usa tu cuenta para transferencias</Text>
            <Text style={styles.savedBankDetail}>
              {[form.savedBank.alias, form.savedBank.cbu ? maskCbu(form.savedBank.cbu) : null]
                .filter(Boolean)
                .join(' · ')}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/cuenta-bancaria')}
            accessibilityRole="button"
            accessibilityLabel="Cambiar la cuenta para transferencias"
            style={styles.changeBank}
          >
            <Text style={text.link}>Cambiar</Text>
          </Pressable>
        </View>
      ) : form.method === 'transfer' ? (
        <>
          <Text style={styles.note}>
            Tus invitados ven estos datos al tocar “Regalar”, con un botón para copiar el CBU. Se
            cargan una sola vez: después los cambiás desde Regalos.
          </Text>
          <TextField
            label="Alias"
            placeholder="Ej: nombre.apellido.banco"
            value={form.alias}
            onChangeText={form.setAlias}
            error={form.fieldErrors.alias}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
          />
          <TextField
            label="CBU o CVU"
            placeholder="22 números"
            value={form.cbu}
            onChangeText={form.setCbu}
            error={form.fieldErrors.cbu}
            keyboardType="number-pad"
            maxLength={22}
          />
          <TextField
            label="Titular (opcional)"
            placeholder="Ej: [Nombre] [Apellido]"
            value={form.holder}
            onChangeText={form.setHolder}
            autoCapitalize="words"
            maxLength={80}
          />
          <TextField
            label="Banco (opcional)"
            placeholder="Ej: Banco [Nombre]"
            value={form.bank}
            onChangeText={form.setBank}
            autoCapitalize="words"
            maxLength={80}
          />
        </>
      ) : (
        <>
          <TextField
            label={form.method === 'payment' ? 'Link de pago' : 'Link del producto'}
            placeholder="Pegá el link acá"
            value={form.url}
            onChangeText={form.setUrl}
            error={form.fieldErrors.url}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          <Text style={styles.note}>
            {form.method === 'payment'
              ? 'Para cobrar con Mercado Pago, creá un link de pago en la app de Mercado Pago (Cobrar, con un link) y pegalo acá. Tus invitados lo abren al tocar “Regalar”.'
              : 'Pegá el link del producto en la tienda. Tus invitados lo abren al tocar “Regalar”.'}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 14,
  },
  progress: {
    gap: 8,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 6,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  progressSegmentDone: {
    backgroundColor: colors.accent,
  },
  question: {
    ...text.screenTitle,
    fontSize: 22,
    lineHeight: 28,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    // Tres por fila.
    width: '31%',
    flexGrow: 1,
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  typeOptionSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.iconBackground,
  },
  pressed: {
    opacity: 0.85,
  },
  typeLabel: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  typeLabelSelected: {
    color: colors.accentText,
  },
  hint: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  note: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    backgroundColor: colors.iconBackground,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    overflow: 'hidden',
  },
  savedBank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  savedBankTexts: {
    flex: 1,
    gap: 2,
  },
  savedBankTitle: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 15,
    color: colors.text,
  },
  savedBankDetail: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 13,
    color: colors.textSecondary,
  },
  changeBank: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    gap: 10,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
  },
});
