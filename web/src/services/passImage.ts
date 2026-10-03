import QRCode from 'qrcode';

type PassData = {
  title: string;
  subtitle: string;
  groupName: string;
  attendees: string[];
  qrText: string;
};

const WIDTH = 900;
const HEIGHT = 1400;
const MAX_LISTED = 6;

function themeColor(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// Corta el texto con "…" si no entra en el ancho.
function fitText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }
  let cut = text;
  while (cut.length > 1 && context.measureText(`${cut}…`).width > maxWidth) {
    cut = cut.slice(0, -1);
  }
  return `${cut.trimEnd()}…`;
}

function personas(count: number) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`;
}

// Dibuja el pase como imagen: nombres de los novios, fecha y lugar, el QR
// y para cuántas personas vale, así se ve también en la puerta.
async function drawPass(data: PassData) {
  const accent = themeColor('--tpl-accent', '#7A5B22');
  const gold = themeColor('--tpl-gold', '#C9A45C');
  const bg = themeColor('--tpl-bg', '#F7F1E6');
  const ink = themeColor('--tpl-ink', '#2E2418');
  const card = themeColor('--tpl-card', '#FFFDF8');

  await Promise.all(
    ['300 40px Figtree', '600 40px Figtree', '700 40px Figtree'].map((font) =>
      document.fonts.load(font).catch(() => undefined),
    ),
  );

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d')!;
  const center = WIDTH / 2;
  const textWidth = WIDTH - 200;

  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = card;
  context.strokeStyle = gold;
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(50, 50, WIDTH - 100, HEIGHT - 100, 44);
  context.fill();
  context.stroke();

  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';

  context.fillStyle = accent;
  context.font = '700 24px Figtree, sans-serif';
  context.letterSpacing = '7px';
  context.fillText('PASE DE INGRESO', center, 160);
  context.letterSpacing = '0px';

  context.fillStyle = ink;
  context.font = '600 44px Figtree, sans-serif';
  context.fillText(fitText(context, data.title, textWidth), center, 230);

  context.globalAlpha = 0.72;
  context.font = '400 28px Figtree, sans-serif';
  context.fillText(fitText(context, data.subtitle, textWidth), center, 280);
  context.globalAlpha = 1;

  // Línea punteada, como el corte de una entrada.
  context.strokeStyle = gold;
  context.setLineDash([10, 10]);
  context.beginPath();
  context.moveTo(110, 340);
  context.lineTo(WIDTH - 110, 340);
  context.stroke();
  context.setLineDash([]);

  const qrSize = 520;
  const qrCanvas = document.createElement('canvas');
  await QRCode.toCanvas(qrCanvas, data.qrText, {
    width: qrSize,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: ink, light: '#FFFFFF' },
  });
  context.drawImage(qrCanvas, center - qrSize / 2, 390, qrSize, qrSize);

  const count = data.attendees.length;
  context.fillStyle = ink;
  context.font = '700 40px Figtree, sans-serif';
  context.fillText(`Válido para ${personas(count)}`, center, 990);

  context.globalAlpha = 0.72;
  context.font = '400 28px Figtree, sans-serif';
  const listed = data.attendees.slice(0, MAX_LISTED);
  listed.forEach((name, index) => {
    context.fillText(fitText(context, name, textWidth), center, 1045 + index * 40);
  });
  if (count > MAX_LISTED) {
    context.fillText(`y ${personas(count - MAX_LISTED)} más`, center, 1045 + MAX_LISTED * 40);
  }
  context.globalAlpha = 1;

  context.fillStyle = accent;
  context.font = '600 24px Figtree, sans-serif';
  context.fillText(fitText(context, `Invitación de ${data.groupName}`, textWidth), center, HEIGHT - 90);

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Sin imagen'))), 'image/png'),
  );
}

// En el celular abre el menú de compartir (desde ahí se guarda en la galería);
// si el navegador no lo permite, descarga la imagen.
export async function sharePassImage(data: PassData) {
  const blob = await drawPass(data);
  const file = new File([blob], 'pase-de-ingreso.png', { type: 'image/png' });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Pase de ingreso' });
      return;
    } catch (error) {
      // Si el invitado cerró el menú sin elegir nada, no es un error.
      if ((error as Error).name === 'AbortError') {
        return;
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
