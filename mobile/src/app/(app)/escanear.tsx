import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { useEntryScan } from '../../controllers/useEntryScan';
import { EntryGuest } from '../../models/Entry';
import { colors } from '../../theme/colors';
import { fonts, text } from '../../theme/typography';
import { isoToTime } from '../../utils/date';

function people(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// Botón redondo del encabezado, sobre el fondo oscuro.
function RoundButton({ label, onPress, children }: { label: string; onPress: () => void; children: ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.roundButton, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

// Esquinas doradas que marcan dónde apuntar.
function ScanFrame() {
  return (
    <View style={styles.frame} pointerEvents="none">
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
}

type Tone = 'valid' | 'warning' | 'invalid';

const toneColors: Record<Tone, { background: string; stroke: string }> = {
  valid: { background: colors.confirmedBackground, stroke: colors.confirmedText },
  warning: { background: colors.pendingBackground, stroke: colors.pendingText },
  invalid: { background: colors.declinedBackground, stroke: colors.declinedText },
};

const tonePaths: Record<Tone, string> = {
  valid: 'M20 6L9 17l-5-5',
  warning: 'M12 8v5M12 17h.01',
  invalid: 'M18 6L6 18M6 6l12 12',
};

// Ícono y título de la tarjeta, como "Invitado válido".
function ResultHeader({ tone, title, subtitle }: { tone: Tone; title: string; subtitle: string }) {
  return (
    <View style={styles.resultHeader}>
      <View style={[styles.resultIcon, { backgroundColor: toneColors[tone].background }]}>
        <Svg
          width={26}
          height={26}
          viewBox="0 0 24 24"
          fill="none"
          stroke={toneColors[tone].stroke}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d={tonePaths[tone]} />
        </Svg>
      </View>
      <View style={styles.resultTexts}>
        <Text style={styles.resultTitle} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.resultSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

// Una persona del pase. Si todavía no entró, se toca para marcarla o desmarcarla.
function GuestRow({ guest, selected, onToggle }: { guest: EntryGuest; selected: boolean; onToggle: () => void }) {
  if (guest.enteredAt) {
    return (
      <View style={styles.guestRow} accessibilityLabel={`${guest.name}, ingresó a las ${isoToTime(guest.enteredAt)}`}>
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.confirmedText} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 6L9 17l-5-5" />
        </Svg>
        <Text style={[styles.guestName, styles.guestEntered]} numberOfLines={1}>
          {guest.name}
        </Text>
        <Text style={styles.guestTime}>Ingresó {isoToTime(guest.enteredAt)}</Text>
      </View>
    );
  }
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityLabel={guest.name}
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [styles.guestRow, pressed && styles.pressed]}
    >
      <View style={[styles.check, selected && styles.checkSelected]}>
        {selected ? (
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={colors.card} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M20 6L9 17l-5-5" />
          </Svg>
        ) : null}
      </View>
      <Text style={styles.guestName} numberOfLines={1}>
        {guest.name}
      </Text>
    </Pressable>
  );
}

// Escaneo en la entrada: la persona de la puerta lee el QR del grupo, ve para cuántas
// personas vale y quiénes son, y registra el ingreso de los que entran.
export default function EscanearScreen() {
  const insets = useSafeAreaInsets();
  const scan = useEntryScan();

  function renderCard() {
    if (scan.step === 'scanning') {
      return null;
    }
    if (scan.step === 'loading') {
      return (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.resultSubtitle}>Revisando el QR…</Text>
        </View>
      );
    }
    if (scan.step === 'error' || !scan.pass) {
      return (
        <>
          <ResultHeader tone="invalid" title="QR no válido" subtitle={scan.error ?? ''} />
          <Button title="Escanear otro QR" onPress={scan.scanAgain} />
        </>
      );
    }
    if (scan.noOneConfirmed) {
      return (
        <>
          <ResultHeader
            tone="invalid"
            title="QR no válido"
            subtitle={`Nadie de ${scan.pass.groupName} confirmó asistencia.`}
          />
          <Button title="Escanear otro QR" onPress={scan.scanAgain} />
        </>
      );
    }

    const total = scan.guests.length;
    const selectedCount = scan.selectedIds.length;
    const header = scan.justRegistered
      ? { tone: 'valid' as const, title: 'Ingreso registrado' }
      : scan.allEntered
        ? { tone: 'warning' as const, title: total === 1 ? 'Ya ingresó' : 'Ya ingresaron' }
        : { tone: 'valid' as const, title: 'Invitado válido' };

    return (
      <>
        <ResultHeader tone={header.tone} title={header.title} subtitle={`Válido para ${people(total)}`} />
        <ScrollView style={styles.guestList} contentContainerStyle={styles.guestListContent}>
          {scan.guests.map((guest) => (
            <GuestRow
              key={guest.id}
              guest={guest}
              selected={scan.selectedIds.includes(guest.id)}
              onToggle={() => scan.toggleGuest(guest.id)}
            />
          ))}
        </ScrollView>
        <View style={styles.summary}>
          <Text style={styles.summaryText} numberOfLines={1}>
            {scan.pass.groupName} · {people(total)}
          </Text>
          <Text style={styles.summaryCount}>
            {scan.enteredCount} de {total}
          </Text>
        </View>
        <FormError message={scan.error} />
        {selectedCount > 0 || !(scan.justRegistered || scan.allEntered) ? (
          <>
            <Button
              title={selectedCount > 0 ? `Registrar ingreso (${selectedCount})` : 'Registrar ingreso'}
              loading={scan.registering}
              disabled={selectedCount === 0}
              onPress={scan.handleRegister}
            />
            <Pressable
              onPress={scan.scanAgain}
              accessibilityRole="button"
              style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
            >
              <Text style={text.link}>Escanear otro QR</Text>
            </Pressable>
          </>
        ) : (
          <Button title="Escanear otro QR" onPress={scan.scanAgain} />
        )}
      </>
    );
  }

  const card = renderCard();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {scan.permissionGranted ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={scan.torchOn}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scan.scanning ? ({ data }) => scan.handleScan(data) : undefined}
        />
      ) : null}

      <View style={[styles.header, { paddingTop: Math.max(56, insets.top + 12) }]}>
        <RoundButton label="Volver" onPress={() => router.back()}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.scannerText} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 18l-6-6 6-6" />
          </Svg>
        </RoundButton>
        <Text style={styles.title} accessibilityRole="header">
          Escanear ingreso
        </Text>
        {scan.permissionGranted ? (
          <RoundButton label={scan.torchOn ? 'Apagar linterna' : 'Prender linterna'} onPress={scan.toggleTorch}>
            <Svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill={scan.torchOn ? colors.lightGold : 'none'}
              stroke={colors.lightGold}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </Svg>
          </RoundButton>
        ) : null}
      </View>

      {scan.permissionGranted ? (
        <View style={styles.aim} pointerEvents="none">
          <ScanFrame />
          <Text style={styles.hint}>Apuntá al QR del invitado</Text>
        </View>
      ) : scan.permissionChecked ? (
        <View style={styles.permission}>
          <Text style={styles.permissionText}>
            Para escanear los QR de los invitados, Wedshare necesita usar la cámara del celular.
          </Text>
          <Button
            title={scan.canAskPermission ? 'Permitir cámara' : 'Abrir configuración'}
            onPress={scan.handlePermission}
          />
        </View>
      ) : null}

      {card ? (
        <View style={[styles.card, { paddingBottom: Math.max(32, insets.bottom + 16) }]}>{card}</View>
      ) : null}
    </View>
  );
}

const CORNER = 40;
const CORNER_WIDTH = 4;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.scannerBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.scannerButton,
    borderWidth: 1,
    borderColor: colors.scannerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  title: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 24,
    color: colors.scannerText,
  },
  aim: {
    alignItems: 'center',
    marginTop: 58,
    gap: 22,
  },
  frame: {
    width: 240,
    height: 240,
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: colors.lightGold,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderTopLeftRadius: 14,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderTopRightRadius: 14,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderBottomLeftRadius: 14,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderBottomRightRadius: 14,
  },
  hint: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.scannerHint,
    textAlign: 'center',
  },
  permission: {
    paddingHorizontal: 24,
    marginTop: 80,
    gap: 20,
  },
  permissionText: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 23,
    color: colors.scannerHint,
    textAlign: 'center',
  },
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    gap: 14,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTexts: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: fonts.semiBold,
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 25,
    color: colors.text,
  },
  resultSubtitle: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  guestList: {
    maxHeight: 264,
    flexGrow: 0,
  },
  guestListContent: {
    gap: 2,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  guestName: {
    flex: 1,
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontSize: 16,
    color: colors.text,
  },
  guestEntered: {
    color: colors.textSecondary,
  },
  guestTime: {
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  summaryText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryCount: {
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontSize: 14,
    color: colors.text,
  },
  linkButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
});
