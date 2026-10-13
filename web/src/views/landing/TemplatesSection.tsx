import coverDorado from '../../assets/landing/plantilla-dorado.jpg';
import coverRosa from '../../assets/landing/plantilla-rosa.jpg';
import coverNoche from '../../assets/landing/plantilla-noche.jpg';
import coverMinimal from '../../assets/landing/plantilla-minimal.jpg';

// Las plantillas de la invitación.
export function TemplatesSection() {
  return (
    <section id="plantillas" className="lp-sec">
      <div className="lp-wrap">
        <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '760px' }}>
          <div className="lp-eyebrow" style={{ color: '#7A5B22' }}>
            Plantillas
          </div>
          <h2 className="lp-h2" style={{ color: '#2E2418' }}>
            Estilos de invitación
          </h2>
          <p
            className="lp-lead"
            style={{
              margin: '0 0 8px',
              maxWidth: '620px',
              color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Todos se completan con tus fotos y tus textos, y podés cambiar de estilo en cualquier momento.
          </p>
        </div>
      </div>
      <div className="lp-wrap" style={{ marginTop: '44px' }}>
        <div className="lp-hscroll">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: '0' }}>
            <div
              style={{
                width: '226px',
                height: '469px',
                borderRadius: '44px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '210px',
                  height: '453px',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.9)', transformOrigin: '0 0' }}>
                  <img
                    src={coverDorado}
                    alt="Portada de la plantilla Dorado clásico"
                    style={{
                      width: '234px',
                      height: '504px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '6px',
                    transform: 'translateX(-50%)',
                    width: '52px',
                    height: '13px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '19px', fontWeight: '700', marginTop: '18px' }}>Dorado clásico</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Elegante y clásica
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: '0' }}>
            <div
              style={{
                width: '226px',
                height: '469px',
                borderRadius: '44px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '210px',
                  height: '453px',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.9)', transformOrigin: '0 0' }}>
                  <img
                    src={coverRosa}
                    alt="Portada de la plantilla Rosa romántico"
                    style={{
                      width: '234px',
                      height: '504px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '6px',
                    transform: 'translateX(-50%)',
                    width: '52px',
                    height: '13px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '19px', fontWeight: '700', marginTop: '18px' }}>Rosa romántico</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Romántica y delicada
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: '0' }}>
            <div
              style={{
                width: '226px',
                height: '469px',
                borderRadius: '44px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '210px',
                  height: '453px',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.9)', transformOrigin: '0 0' }}>
                  <img
                    src={coverMinimal}
                    alt="Portada de la plantilla Minimalista"
                    style={{
                      width: '234px',
                      height: '504px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '6px',
                    transform: 'translateX(-50%)',
                    width: '52px',
                    height: '13px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '19px', fontWeight: '700', marginTop: '18px' }}>Minimalista</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Simple, en blanco y negro
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: '0' }}>
            <div
              style={{
                width: '226px',
                height: '469px',
                borderRadius: '44px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '210px',
                  height: '453px',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.9)', transformOrigin: '0 0' }}>
                  <img
                    src={coverNoche}
                    alt="Portada de la plantilla Noche azul"
                    style={{
                      width: '234px',
                      height: '504px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '6px',
                    transform: 'translateX(-50%)',
                    width: '52px',
                    height: '13px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '19px', fontWeight: '700', marginTop: '18px' }}>Noche azul</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Art déco, de fondo azul
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
