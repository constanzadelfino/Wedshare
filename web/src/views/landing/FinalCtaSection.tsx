import { AppLink, EXAMPLE_URL } from '../../components/AppLink';
import coupleField from '../../assets/landing/pareja-campo.jpg';

// Cierre: "Creá tu invitación" con los dos botones.
export function FinalCtaSection() {
  return (
    <section style={{ padding: '24px 0 0' }}>
      <div className="lp-wrap">
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#2A1F14',
            color: '#F7F1E6',
            borderRadius: '36px',
            padding: '64px 28px',
            textAlign: 'center',
            outline: '1px solid #C9A45C',
            outlineOffset: '-12px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '-140px',
              width: '340px',
              height: '420px',
              marginLeft: '-170px',
              borderRadius: '999px 999px 0 0',
              border: '1px solid rgba(201,164,92,0.35)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '128px',
                height: '168px',
                margin: '0 auto 26px',
                borderRadius: '999px 999px 12px 12px',
                border: '1.5px solid #C9A45C',
                outline: '1px solid #C9A45C',
                outlineOffset: '5px',
                overflow: 'hidden',
              }}
            >
              <img
                src={coupleField}
                alt="Pareja en el campo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 30%',
                  display: 'block',
                }}
              />
            </div>
            <h2 className="lp-h2" style={{ color: '#F7F1E6', margin: '0 auto 16px', maxWidth: '640px' }}>
              Creá tu invitación
            </h2>
            <p
              className="lp-lead"
              style={{ margin: '0 auto 28px', maxWidth: '520px', color: 'color-mix(in srgb, #F7F1E6 78%, #2A1F14)' }}
            >
              Elegí una plantilla, compartila por WhatsApp y empezá a recibir las confirmaciones.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
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
                  background: '#C9A45C',
                  color: '#2A1F14',
                  border: '0',
                }}
              >
                Crear mi invitación
              </AppLink>
              <a
                href={EXAMPLE_URL}
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
                  background: 'transparent',
                  color: '#F7F1E6',
                  border: '1.5px solid #C9A45C',
                }}
              >
                Ver un ejemplo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
