import { AppLink } from '../../components/AppLink';

// Cómo funciona: los cuatro pasos.
export function HowItWorksSection() {
  return (
    <section id="como" className="lp-sec" style={{ background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)' }}>
      <div className="lp-wrap">
        <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '760px' }}>
          <div className="lp-eyebrow" style={{ color: '#7A5B22' }}>
            Cómo funciona
          </div>
          <h2 className="lp-h2" style={{ color: '#2E2418' }}>
            Cuatro pasos para tener tu invitación
          </h2>
        </div>
        <div className="lp-grid4" style={{ marginTop: '48px' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}
          >
            <span
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '38px',
                border: '1.5px solid #C9A45C',
                outline: '1px solid #C9A45C',
                outlineOffset: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '300',
                color: '#7A5B22',
                background: '#FFFDF8',
              }}
            >
              1
            </span>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px' }}>Elegí la plantilla</div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                maxWidth: '260px',
              }}
            >
              La que mejor represente tu casamiento.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}
          >
            <span
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '38px',
                border: '1.5px solid #C9A45C',
                outline: '1px solid #C9A45C',
                outlineOffset: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '300',
                color: '#7A5B22',
                background: '#FFFDF8',
              }}
            >
              2
            </span>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px' }}>Cargá tus datos</div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                maxWidth: '260px',
              }}
            >
              Fechas, lugares, fotos y todo lo que quieras contar.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}
          >
            <span
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '38px',
                border: '1.5px solid #C9A45C',
                outline: '1px solid #C9A45C',
                outlineOffset: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '300',
                color: '#7A5B22',
                background: '#FFFDF8',
              }}
            >
              3
            </span>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px' }}>Compartí los links</div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                maxWidth: '260px',
              }}
            >
              Por WhatsApp, uno para cada invitado o familia.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}
          >
            <span
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '38px',
                border: '1.5px solid #C9A45C',
                outline: '1px solid #C9A45C',
                outlineOffset: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '300',
                color: '#7A5B22',
                background: '#FFFDF8',
              }}
            >
              4
            </span>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px' }}>Seguí las confirmaciones</div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                maxWidth: '260px',
              }}
            >
              Desde la app ves quién confirmó y quién falta.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <AppLink
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: '52px',
              padding: '0 28px',
              borderRadius: '999px',
              fontFamily: 'inherit',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              cursor: 'pointer',
              background: '#2A1F14',
              color: '#F7F1E6',
              border: '0',
            }}
          >
            Crear mi invitación
          </AppLink>
        </div>
      </div>
    </section>
  );
}
