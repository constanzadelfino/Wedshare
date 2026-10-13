import coupleSunset from '../../assets/landing/pareja-atardecer.jpg';
import { SAMPLE_QR_PATH } from './sampleQr';

// Para tus invitados: qué ven ellos, del WhatsApp al QR.
export function GuestsSection() {
  return (
    <section className="lp-sec" style={{ background: '#2A1F14', color: '#F7F1E6' }}>
      <div className="lp-wrap">
        <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '760px' }}>
          <div className="lp-eyebrow" style={{ color: '#C9A45C' }}>
            Para tus invitados
          </div>
          <h2 className="lp-h2" style={{ color: '#F7F1E6' }}>
            Tus invitados no necesitan instalar nada
          </h2>
          <p
            className="lp-lead"
            style={{
              margin: '0 0 8px',
              maxWidth: '620px',
              color: 'color-mix(in srgb, #F7F1E6 78%, #2A1F14)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Abren el link desde el navegador del celular, sin descargar aplicaciones ni crear una cuenta.
          </p>
        </div>
        <div className="lp-grid4" style={{ marginTop: '48px', justifyItems: 'center' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}
          >
            <div
              style={{
                width: '179px',
                height: '368px',
                borderRadius: '36px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '163px',
                  height: '352px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.7)', transformOrigin: '0 0' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '234px',
                      height: '504px',
                      overflow: 'hidden',
                      fontFamily: "'Figtree', sans-serif",
                      boxSizing: 'border-box',
                      background: '#EAE2D2',
                      color: '#2E2418',
                    }}
                  >
                    <div
                      style={{
                        height: '70px',
                        background: '#FFFDF8',
                        borderBottom: '1px solid #E3D5BC',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '8px',
                        padding: '0 14px 10px',
                      }}
                    >
                      <span style={{ width: '26px', height: '26px', borderRadius: '13px', background: '#EADFC9' }} />
                      <span style={{ fontSize: '11px', fontWeight: '700' }}>Sofía</span>
                    </div>
                    <div style={{ padding: '18px 14px', display: 'flex', justifyContent: 'flex-end' }}>
                      <div
                        style={{
                          width: '168px',
                          background: '#FFFDF8',
                          borderRadius: '12px 12px 2px 12px',
                          padding: '5px',
                          boxShadow: '0 2px 6px rgba(46,36,24,0.10)',
                        }}
                      >
                        <div style={{ height: '84px', borderRadius: '8px', overflow: 'hidden' }}>
                          <img
                            src={coupleSunset}
                            alt="Pareja"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: '50% 38%',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div style={{ padding: '6px 4px 2px' }}>
                          <div style={{ fontSize: '9px', fontWeight: '700', lineHeight: '1.25' }}>
                            Ana y Bruno te invitan a su casamiento
                          </div>
                          <div style={{ fontSize: '7px', color: '#6B5A44', marginTop: '2px' }}>
                            wedshare.app/ana-y-bruno
                          </div>
                        </div>
                        <div style={{ fontSize: '8px', padding: '4px 4px 2px', lineHeight: '1.3' }}>
                          ¡Nos casamos! Abrí tu invitación y confirmá tu asistencia.
                        </div>
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
                    width: '40px',
                    height: '10px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '16px' }}>Reciben el link</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Por WhatsApp, con su nombre.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}
          >
            <div
              style={{
                width: '179px',
                height: '368px',
                borderRadius: '36px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '163px',
                  height: '352px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.7)', transformOrigin: '0 0' }}>
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
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
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
                    width: '40px',
                    height: '10px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '16px' }}>Abren el sobre</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Con el sello de las iniciales.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}
          >
            <div
              style={{
                width: '179px',
                height: '368px',
                borderRadius: '36px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '163px',
                  height: '352px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.7)', transformOrigin: '0 0' }}>
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
                      padding: '44px 16px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '7px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#C9A45C',
                        fontWeight: '700',
                      }}
                    >
                      Confirmación de asistencia
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '300', lineHeight: '1.2' }}>
                      Esperamos contar
                      <br />
                      con tu presencia
                    </div>
                    <div
                      style={{
                        background: '#F7F1E6',
                        color: '#2E2418',
                        borderRadius: '14px',
                        padding: '14px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        textAlign: 'left',
                        outline: '1px solid #C9A45C',
                        outlineOffset: '-5px',
                        marginTop: '6px',
                      }}
                    >
                      <div style={{ fontSize: '8px', textAlign: 'center', color: '#6B5A44' }}>
                        {'Tu invitación incluye a '}
                        <b style={{ color: '#2E2418' }}>2 personas</b>
                      </div>
                      <div
                        style={{
                          border: '1px solid #E3D5BC',
                          borderRadius: '10px',
                          padding: '8px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#FFFDF8',
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '4px',
                            background: '#8A6A2F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFDF8"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: '700', flex: '1' }}>Sofía Pérez</span>
                        <span style={{ fontSize: '7px', color: '#6B5A44' }}>Sin TACC</span>
                      </div>
                      <div
                        style={{
                          border: '1px solid #E3D5BC',
                          borderRadius: '10px',
                          padding: '8px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#FFFDF8',
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '4px',
                            background: '#8A6A2F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFDF8"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: '700', flex: '1' }}>Martín Pérez</span>
                        <span style={{ fontSize: '7px', color: '#6B5A44' }}>Sin TACC</span>
                      </div>
                      <div
                        style={{
                          height: '26px',
                          border: '1px solid #E3D5BC',
                          borderRadius: '8px',
                          background: '#FFFDF8',
                          fontSize: '8px',
                          color: '#7A6A54',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 8px',
                        }}
                      >
                        Un mensaje para los novios
                      </div>
                      <div
                        style={{
                          height: '30px',
                          borderRadius: '15px',
                          background: '#2A1F14',
                          color: '#F7F1E6',
                          fontSize: '9px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Confirmar asistencia
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
                    width: '40px',
                    height: '10px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '16px' }}>Confirman</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Toda la familia junta.
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}
          >
            <div
              style={{
                width: '179px',
                height: '368px',
                borderRadius: '36px',
                background: '#1F1812',
                padding: '8px',
                boxShadow: '0 30px 60px rgba(42,31,20,0.28), 0 6px 14px rgba(42,31,20,0.18)',
                flexShrink: '0',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '163px',
                  height: '352px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#000',
                }}
              >
                <div style={{ width: '234px', height: '504px', transform: 'scale(0.7)', transformOrigin: '0 0' }}>
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
                    width: '40px',
                    height: '10px',
                    borderRadius: '8px',
                    background: '#1F1812',
                    zIndex: '5',
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '16px' }}>Guardan su QR</div>
            <div style={{ fontSize: '15px', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Se habilita al confirmar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
