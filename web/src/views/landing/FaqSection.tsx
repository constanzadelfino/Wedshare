// Preguntas frecuentes.
export function FaqSection() {
  return (
    <section id="faq" className="lp-sec">
      <div className="lp-wrap" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '760px' }}>
          <div className="lp-eyebrow" style={{ color: '#7A5B22' }}>
            Preguntas frecuentes
          </div>
          <h2 className="lp-h2" style={{ color: '#2E2418' }}>
            Antes de empezar
          </h2>
        </div>
        <div style={{ marginTop: '32px' }}>
          <details open style={{ borderBottom: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)' }}>
            <summary>
              ¿Mis invitados tienen que descargar una app?
              <span style={{ color: '#7A5B22', fontSize: '26px', fontWeight: '300', flexShrink: '0' }}>+</span>
            </summary>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              }}
            >
              No. Abren el link desde el navegador del celular. La app es solo para los novios.
            </p>
          </details>
          <details style={{ borderBottom: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)' }}>
            <summary>
              ¿Cuánto tarda armar la invitación?
              <span style={{ color: '#7A5B22', fontSize: '26px', fontWeight: '300', flexShrink: '0' }}>+</span>
            </summary>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              }}
            >
              Se elige la plantilla, se cargan los datos y se envía el link. El resto se puede completar más adelante.
            </p>
          </details>
          <details style={{ borderBottom: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)' }}>
            <summary>
              ¿Puedo cambiar la plantilla más adelante?
              <span style={{ color: '#7A5B22', fontSize: '26px', fontWeight: '300', flexShrink: '0' }}>+</span>
            </summary>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              }}
            >
              Sí. Los datos y las fotos se mantienen al cambiar de estilo.
            </p>
          </details>
          <details style={{ borderBottom: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)' }}>
            <summary>
              ¿Cómo funciona el QR?
              <span style={{ color: '#7A5B22', fontSize: '26px', fontWeight: '300', flexShrink: '0' }}>+</span>
            </summary>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              }}
            >
              Cuando un invitado confirma, su QR aparece en su invitación. En la entrada se escanea desde la app y queda
              registrado su ingreso.
            </p>
          </details>
          <details style={{ borderBottom: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)' }}>
            <summary>
              ¿Qué pasa si alguien no tiene buena señal?
              <span style={{ color: '#7A5B22', fontSize: '26px', fontWeight: '300', flexShrink: '0' }}>+</span>
            </summary>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              }}
            >
              Puede guardar el QR como imagen en el celular y mostrarlo desde ahí.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
