import { AppLink, EXAMPLE_URL } from '../../components/AppLink';
import coupleSunset from '../../assets/landing/pareja-atardecer.jpg';
import couple from '../../assets/landing/pareja.jpg';
import { SAMPLE_QR_PATH } from './sampleQr';

// Portada: título, botones y los tres celulares con la invitación.
export function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="lp-wrap">
        <div className="lp-hero">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '22px' }}>
            <div className="lp-eyebrow" style={{ color: '#7A5B22', margin: '0' }}>
              Invitaciones digitales para casamientos
            </div>
            <h1 className="lp-h1" style={{ margin: '0' }}>
              {'La invitación es '}
              <span style={{ fontWeight: '700', color: '#7A5B22' }}>solo el comienzo</span>.
            </h1>
            <p
              className="lp-lead"
              style={{ margin: '0', maxWidth: '520px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}
            >
              Creá tu invitación, compartila por WhatsApp y seguí las confirmaciones desde la app. El día de la fiesta,
              tus invitados ingresan con un código QR.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '6px' }}>
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
                  color: '#2A1F14',
                  border: '1.5px solid #2A1F14',
                }}
              >
                Ver un ejemplo
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7A5B22"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Tus invitados no necesitan instalar nada
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7A5B22"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Se comparte por WhatsApp con un link
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="lp-phones">
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '20px',
                  width: '380px',
                  height: '540px',
                  marginLeft: '-190px',
                  borderRadius: '999px 999px 28px 28px',
                  background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                  border: '1.5px solid #C9A45C',
                  outline: '1px solid #C9A45C',
                  outlineOffset: '10px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={coupleSunset}
                  alt="Pareja bailando al atardecer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 52%',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ position: 'absolute', left: '0', top: '70px', transform: 'rotate(-7deg)' }}>
                <div
                  style={{
                    width: '217px',
                    height: '449px',
                    borderRadius: '42px',
                    background: '#1F1812',
                    padding: '8px',
                    boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                    flexShrink: '0',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      width: '201px',
                      height: '433px',
                      borderRadius: '33px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#000',
                    }}
                  >
                    <div style={{ width: '234px', height: '504px', transform: 'scale(0.86)', transformOrigin: '0 0' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '234px',
                          height: '504px',
                          overflow: 'hidden',
                          fontFamily: "'Figtree', sans-serif",
                          boxSizing: 'border-box',
                          background: '#EFE5D1',
                        }}
                      >
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          style={{ position: 'absolute', left: '0', top: '0' }}
                          aria-hidden="true"
                        >
                          <polygon points="0,0 100,0 50,56" fill="rgba(46,36,24,0.10)" transform="translate(0 1.6)" />
                          <polygon points="0,0 100,0 50,56" fill="#FFFDF8" />
                          <polyline
                            points="0,0 50,56 100,0"
                            fill="none"
                            stroke="#E3D5BC"
                            strokeWidth="1.2"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                        <div
                          style={{
                            position: 'absolute',
                            left: '0',
                            top: '34px',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '8px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontWeight: '700',
                            color: '#6B5A44',
                          }}
                        >
                          Una invitación para vos
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '56%',
                            transform: 'translate(-50%, -50%)',
                            width: '96px',
                            height: '96px',
                            borderRadius: '48px',
                            background: '#C9A45C',
                            color: '#2A1F14',
                            boxShadow:
                              'inset 0 0 0 4px #C9A45C, inset 0 0 0 5px rgba(255,253,248,0.65), 0 8px 18px rgba(0,0,0,0.22)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontWeight: '300',
                              letterSpacing: '0.04em',
                            }}
                          >
                            <span style={{ fontSize: '28px', lineHeight: '1' }}>A</span>
                            <span
                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}
                            >
                              <span style={{ width: '1px', height: '8px', background: '#2A1F14' }} />
                              <span style={{ fontSize: '10px', lineHeight: '1' }}>&</span>
                              <span style={{ width: '1px', height: '8px', background: '#2A1F14' }} />
                            </span>
                            <span style={{ fontSize: '28px', lineHeight: '1' }}>B</span>
                          </span>
                          <span style={{ fontSize: '8px', letterSpacing: '0.3em', fontWeight: '700' }}>ABRIR</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '6px',
                        transform: 'translateX(-50%)',
                        width: '49px',
                        height: '12px',
                        borderRadius: '8px',
                        background: '#1F1812',
                        zIndex: '5',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '0', top: '70px', transform: 'rotate(7deg)' }}>
                <div
                  style={{
                    width: '217px',
                    height: '449px',
                    borderRadius: '42px',
                    background: '#1F1812',
                    padding: '8px',
                    boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                    flexShrink: '0',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      width: '201px',
                      height: '433px',
                      borderRadius: '33px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#000',
                    }}
                  >
                    <div style={{ width: '234px', height: '504px', transform: 'scale(0.86)', transformOrigin: '0 0' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '234px',
                          height: '504px',
                          overflow: 'hidden',
                          fontFamily: "'Figtree', sans-serif",
                          boxSizing: 'border-box',
                          background: '#F7F1E6',
                          color: '#2E2418',
                          padding: '40px 18px 0',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '8px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontWeight: '700',
                            color: '#7A5B22',
                          }}
                        >
                          Tu acceso
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: '300', textAlign: 'center', lineHeight: '1.15' }}>
                          Entrá sin
                          <br />
                          hacer fila
                        </div>
                        <div
                          style={{
                            position: 'relative',
                            width: '190px',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            textAlign: 'center',
                            boxShadow: '0 10px 24px rgba(46,36,24,0.10)',
                            marginTop: '6px',
                          }}
                        >
                          <div style={{ padding: '16px 12px 12px' }}>
                            <div
                              style={{
                                fontSize: '7px',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: '#7A5B22',
                                fontWeight: '700',
                              }}
                            >
                              Pase de ingreso
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '3px' }}>Ana & Bruno</div>
                          </div>
                          <div style={{ position: 'relative', height: '14px' }}>
                            <span
                              style={{
                                position: 'absolute',
                                left: '14px',
                                right: '14px',
                                top: '6px',
                                borderTop: '1.5px dashed #E3D5BC',
                              }}
                            />
                            <span
                              style={{
                                position: 'absolute',
                                left: '-8px',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '8px',
                                background: '#F7F1E6',
                                border: '1px solid #E3D5BC',
                              }}
                            />
                            <span
                              style={{
                                position: 'absolute',
                                right: '-8px',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '8px',
                                background: '#F7F1E6',
                                border: '1px solid #E3D5BC',
                              }}
                            />
                          </div>
                          <div
                            style={{
                              padding: '12px 12px 14px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <div
                              style={{
                                padding: '8px',
                                background: '#fff',
                                border: '1px solid #E3D5BC',
                                borderRadius: '10px',
                              }}
                            >
                              <svg
                                width="96"
                                height="96"
                                viewBox="0 0 96 96"
                                aria-hidden="true"
                                style={{ display: 'block' }}
                              >
                                <path d={SAMPLE_QR_PATH} fill="#2E2418" />
                              </svg>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '700' }}>Sofía Pérez</div>
                            <div style={{ fontSize: '8px', color: '#6B5A44' }}>2 personas · Mostralo en la entrada</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '6px',
                        transform: 'translateX(-50%)',
                        width: '49px',
                        height: '12px',
                        borderRadius: '8px',
                        background: '#1F1812',
                        zIndex: '5',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: '50%', top: '0', marginLeft: '-125px', zIndex: '2' }}>
                <div
                  style={{
                    width: '250px',
                    height: '520px',
                    borderRadius: '48px',
                    background: '#1F1812',
                    padding: '8px',
                    boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                    flexShrink: '0',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      width: '234px',
                      height: '504px',
                      borderRadius: '38px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#000',
                    }}
                  >
                    <div style={{ width: '234px', height: '504px', transform: 'scale(1.0)', transformOrigin: '0 0' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '234px',
                          height: '504px',
                          overflow: 'hidden',
                          fontFamily: "'Figtree', sans-serif",
                          boxSizing: 'border-box',
                          background: '#2A1F14',
                          color: '#F7F1E6',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          paddingTop: '44px',
                          gap: '10px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '170px' }}>
                          <span style={{ flex: '1', height: '1px', background: '#C9A45C' }} />
                          <span
                            style={{
                              fontSize: '7px',
                              letterSpacing: '0.32em',
                              textTransform: 'uppercase',
                              color: '#C9A45C',
                              fontWeight: '700',
                            }}
                          >
                            Nos casamos
                          </span>
                          <span style={{ flex: '1', height: '1px', background: '#C9A45C' }} />
                        </div>
                        <div style={{ marginTop: '6px' }}>
                          <div
                            style={{
                              width: '112px',
                              height: '150px',
                              borderRadius: '999px 999px 10px 10px',
                              border: '1.5px solid #C9A45C',
                              padding: '4px',
                              outline: '1px solid #C9A45C',
                              outlineOffset: '4px',
                              boxSizing: 'border-box',
                            }}
                          >
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '999px 999px 6px 6px',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={couple}
                                alt="Pareja"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: '48% 40%',
                                  display: 'block',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: '17px',
                            fontWeight: '300',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            marginTop: '12px',
                          }}
                        >
                          Ana
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '90px' }}>
                          <span style={{ flex: '1', height: '1px', background: '#C9A45C' }} />
                          <span style={{ fontSize: '13px', fontWeight: '300', color: '#C9A45C' }}>&</span>
                          <span style={{ flex: '1', height: '1px', background: '#C9A45C' }} />
                        </div>
                        <div
                          style={{
                            fontSize: '17px',
                            fontWeight: '300',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Bruno
                        </div>
                        <div style={{ fontSize: '14px', color: '#C9A45C', marginTop: '8px' }}>¡Nos casamos!</div>
                        <div style={{ fontSize: '8px', color: '#D8CDB6' }}>y queremos compartirlo con vos</div>
                        <div
                          style={{
                            marginTop: '8px',
                            padding: '6px 12px',
                            border: '1px solid #C9A45C',
                            borderRadius: '12px',
                            fontSize: '7px',
                            fontWeight: '600',
                          }}
                        >
                          Invitación para Sofía · 2 personas
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '6px',
                        transform: 'translateX(-50%)',
                        width: '58px',
                        height: '15px',
                        borderRadius: '8px',
                        background: '#1F1812',
                        zIndex: '5',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FFFDF8',
                  border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
                  borderRadius: '16px',
                  padding: '10px 14px 10px 10px',
                  boxShadow: '0 16px 36px rgba(42,31,20,0.16)',
                  zIndex: '4',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>Sofía confirmó</span>
                  <span style={{ fontSize: '12px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
                    2 personas · sin TACC
                  </span>
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: '-8px',
                  top: '90px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FFFDF8',
                  border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
                  borderRadius: '16px',
                  padding: '10px 14px 10px 10px',
                  boxShadow: '0 16px 36px rgba(42,31,20,0.16)',
                  zIndex: '4',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
                  </svg>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>Ingreso registrado</span>
                  <span style={{ fontSize: '12px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
                    QR escaneado en la puerta
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
