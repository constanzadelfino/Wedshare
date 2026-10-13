import { CSSProperties, ReactNode, useState } from 'react';

// Dónde se descarga la app de los novios (el APK para Android). Mientras no esté publicada,
// el botón avisa que llega pronto en lugar de llevar a ningún lado.
const APP_DOWNLOAD_URL = import.meta.env.VITE_APP_DOWNLOAD_URL || null;

type Props = { style: CSSProperties; children: ReactNode };

// Botón "Crear mi invitación" de la landing: lleva a descargar la app.
export function AppLink({ style, children }: Props) {
  const [notice, setNotice] = useState(false);

  if (APP_DOWNLOAD_URL) {
    return (
      <a href={APP_DOWNLOAD_URL} style={style}>
        {children}
      </a>
    );
  }
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        style={style}
        onClick={() => {
          setNotice(true);
          window.setTimeout(() => setNotice(false), 3500);
        }}
      >
        {children}
      </button>
      {notice ? (
        <span
          role="status"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 240,
            padding: '10px 14px',
            borderRadius: 12,
            background: '#2A1F14',
            color: '#F7F1E6',
            fontSize: 14,
            lineHeight: 1.4,
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          La app para Android va a estar disponible muy pronto.
        </span>
      ) : null}
    </span>
  );
}

export { EXAMPLE_URL } from '../utils/example';
