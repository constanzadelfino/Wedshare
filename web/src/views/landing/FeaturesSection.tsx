import { SAMPLE_QR_PATH } from './sampleQr';

// Funciones: la invitación, la confirmación, la app y el ingreso con QR.
export function FeaturesSection() {
  return (
    <section id="funciones" className="lp-sec">
      <div className="lp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
        <div className="lp-frow">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
            <div className="lp-eyebrow" style={{ color: '#7A5B22', margin: '0' }}>
              La invitación
            </div>
            <h2 className="lp-h2" style={{ margin: '0' }}>
              Elegí una plantilla y completala con tus datos
            </h2>
            <p
              className="lp-lead"
              style={{ margin: '0', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)', maxWidth: '480px' }}
            >
              Hay cuatro estilos disponibles, y cada uno se completa con tus fotos y tus textos.
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: '4px 0 0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Estilo clásico, romántico, art déco o minimalista
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Tus fotos, tus textos y la historia de ustedes
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Secciones opcionales, para mostrar solo lo que prefieras
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '20px 0' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                width: '300px',
                height: '100%',
                marginLeft: '-150px',
                borderRadius: '999px 999px 24px 24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1.5px solid #C9A45C',
                opacity: '0.9',
              }}
            />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                        background: '#F7F1E6',
                        color: '#2E2418',
                        padding: '40px 14px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div style={{ fontSize: '17px', fontWeight: '700' }}>Tu invitación</div>
                      <div style={{ fontSize: '8px', color: '#6B5A44', lineHeight: '1.4' }}>
                        Elegí una plantilla. Después sumás tus fotos y tus textos.
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '2px solid #8A6A2F',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '74px',
                              background: '#2A1F14',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: '26px',
                                height: '34px',
                                borderRadius: '20px 20px 4px 4px',
                                border: '1px solid #C9A45C',
                                background: 'rgba(201,164,92,0.2)',
                              }}
                            />
                          </div>
                          <div style={{ height: '14px', background: '#F7F1E6' }} />
                          <div style={{ padding: '5px 7px 7px', fontSize: '8px', fontWeight: '700' }}>
                            Dorado clásico
                          </div>
                        </div>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '74px',
                              background: '#FBE3DD',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '0 0 24px 24px',
                                background: 'rgba(212,149,143,0.3)',
                                borderBottom: '1px solid #D4958F',
                              }}
                            />
                          </div>
                          <div style={{ height: '14px', background: '#FBF1EE' }} />
                          <div style={{ padding: '5px 7px 7px', fontSize: '8px', fontWeight: '700' }}>
                            Rosa romántico
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '74px',
                              background: '#FFFFFF',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              gap: '3px',
                              padding: '0 10px',
                              color: '#111111',
                            }}
                          >
                            <div style={{ fontSize: '5px', letterSpacing: '0.2em', color: '#6B6B6B' }}>19.03.27</div>
                            <div style={{ fontSize: '13px', lineHeight: '1', fontWeight: '500' }}>Ana</div>
                            <div style={{ fontSize: '13px', lineHeight: '1', fontWeight: '500' }}>Bruno</div>
                          </div>
                          <div style={{ height: '14px', background: '#D9D9D9' }} />
                          <div style={{ padding: '5px 7px 7px', fontSize: '8px', fontWeight: '700' }}>Minimalista</div>
                        </div>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '74px',
                              background: '#1B2740',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '16px',
                                border: '1px solid #D9B873',
                                color: '#F4F2EC',
                                fontSize: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              A&B
                            </div>
                          </div>
                          <div style={{ height: '14px', background: '#F4F2EC' }} />
                          <div style={{ padding: '5px 7px 7px', fontSize: '8px', fontWeight: '700' }}>Noche azul</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <div
                          style={{
                            flex: '1',
                            height: '30px',
                            border: '1.5px solid #8A6A2F',
                            borderRadius: '10px',
                            fontSize: '8px',
                            fontWeight: '700',
                            color: '#7A5B22',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Vista previa
                        </div>
                        <div
                          style={{
                            flex: '1',
                            height: '30px',
                            background: '#8A6A2F',
                            borderRadius: '10px',
                            fontSize: '8px',
                            fontWeight: '700',
                            color: '#FFFDF8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Usar plantilla
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
          </div>
        </div>
        <div className="lp-frow lp-rev">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
            <div className="lp-eyebrow" style={{ color: '#7A5B22', margin: '0' }}>
              Confirmaciones
            </div>
            <h2 className="lp-h2" style={{ margin: '0' }}>
              Una sola confirmación por familia
            </h2>
            <p
              className="lp-lead"
              style={{ margin: '0', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)', maxWidth: '480px' }}
            >
              Cada familia o grupo recibe un link propio. Desde ahí indican quiénes asisten y sus preferencias
              alimentarias, sin completar un formulario por persona.
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: '4px 0 0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Un link para cada invitado o grupo
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Registro de preferencias alimentarias
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Fecha límite de confirmación definida por vos
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '20px 0' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                width: '300px',
                height: '100%',
                marginLeft: '-150px',
                borderRadius: '999px 999px 24px 24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1.5px solid #C9A45C',
                opacity: '0.9',
              }}
            />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
          </div>
        </div>
        <div className="lp-frow">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
            <div className="lp-eyebrow" style={{ color: '#7A5B22', margin: '0' }}>
              La app
            </div>
            <h2 className="lp-h2" style={{ margin: '0' }}>
              Seguí las confirmaciones desde la app
            </h2>
            <p
              className="lp-lead"
              style={{ margin: '0', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)', maxWidth: '480px' }}
            >
              La app reúne a todos los invitados: quién confirmó, quién falta y qué necesita cada uno para comer.
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: '4px 0 0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Filtro por estado y por grupo
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Mensajes de los invitados
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Avisos en el celular cuando un invitado responde
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '20px 0' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                width: '300px',
                height: '100%',
                marginLeft: '-150px',
                borderRadius: '999px 999px 24px 24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1.5px solid #C9A45C',
                opacity: '0.9',
              }}
            />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                        background: '#F7F1E6',
                        color: '#2E2418',
                        padding: '40px 14px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div style={{ fontSize: '17px', fontWeight: '700' }}>Invitados</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            padding: '8px 10px',
                          }}
                        >
                          <div style={{ fontSize: '7px', color: '#6B5A44' }}>Confirmados</div>
                          <div style={{ fontSize: '20px', fontWeight: '300', color: '#7A5B22', lineHeight: '1.1' }}>
                            3
                          </div>
                        </div>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            padding: '8px 10px',
                          }}
                        >
                          <div style={{ fontSize: '7px', color: '#6B5A44' }}>Pendiente</div>
                          <div style={{ fontSize: '20px', fontWeight: '300', color: '#7A5B22', lineHeight: '1.1' }}>
                            1
                          </div>
                        </div>
                        <div
                          style={{
                            flex: '1',
                            background: '#FFFDF8',
                            border: '1px solid #E3D5BC',
                            borderRadius: '12px',
                            padding: '8px 10px',
                          }}
                        >
                          <div style={{ fontSize: '7px', color: '#6B5A44' }}>No asiste</div>
                          <div style={{ fontSize: '20px', fontWeight: '300', color: '#7A5B22', lineHeight: '1.1' }}>
                            1
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <span
                          style={{
                            padding: '5px 10px',
                            borderRadius: '12px',
                            background: '#8A6A2F',
                            color: '#FFFDF8',
                            fontSize: '8px',
                            fontWeight: '700',
                          }}
                        >
                          Todos
                        </span>
                        <span
                          style={{
                            padding: '5px 10px',
                            borderRadius: '12px',
                            border: '1px solid #E3D5BC',
                            background: '#FFFDF8',
                            fontSize: '8px',
                            fontWeight: '700',
                          }}
                        >
                          Confirmados
                        </span>
                        <span
                          style={{
                            padding: '5px 10px',
                            borderRadius: '12px',
                            border: '1px solid #E3D5BC',
                            background: '#FFFDF8',
                            fontSize: '8px',
                            fontWeight: '700',
                          }}
                        >
                          Pendientes
                        </span>
                      </div>
                      <div
                        style={{
                          background: '#FFFDF8',
                          border: '1px solid #E3D5BC',
                          borderRadius: '14px',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ padding: '8px 10px 4px', fontSize: '11px', fontWeight: '600' }}>
                          Familia Pérez
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderBottom: '1px solid #E3D5BC',
                          }}
                        >
                          <span
                            style={{ width: '22px', height: '22px', borderRadius: '11px', background: '#EADFC9' }}
                          />
                          <span style={{ flex: '1', fontSize: '10px', fontWeight: '600' }}>Sofía Pérez</span>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '9px',
                              background: '#E6EDD8',
                              color: '#3F5223',
                              fontSize: '7px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Confirmó
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderBottom: '1px solid #E3D5BC',
                          }}
                        >
                          <span
                            style={{ width: '22px', height: '22px', borderRadius: '11px', background: '#EADFC9' }}
                          />
                          <span style={{ flex: '1', fontSize: '10px', fontWeight: '600' }}>Martín Pérez</span>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '9px',
                              background: '#E6EDD8',
                              color: '#3F5223',
                              fontSize: '7px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Confirmó
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderBottom: '1px solid #E3D5BC',
                          }}
                        >
                          <span
                            style={{ width: '22px', height: '22px', borderRadius: '11px', background: '#EADFC9' }}
                          />
                          <span style={{ flex: '1', fontSize: '10px', fontWeight: '600' }}>Lucía Gómez</span>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '9px',
                              background: '#F3E6C8',
                              color: '#7A5A12',
                              fontSize: '7px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Pendiente
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderBottom: '1px solid #E3D5BC',
                          }}
                        >
                          <span
                            style={{ width: '22px', height: '22px', borderRadius: '11px', background: '#EADFC9' }}
                          />
                          <span style={{ flex: '1', fontSize: '10px', fontWeight: '600' }}>Tomás Ruiz</span>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '9px',
                              background: '#E6EDD8',
                              color: '#3F5223',
                              fontSize: '7px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Confirmó
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderBottom: '1px solid #E3D5BC',
                          }}
                        >
                          <span
                            style={{ width: '22px', height: '22px', borderRadius: '11px', background: '#EADFC9' }}
                          />
                          <span style={{ flex: '1', fontSize: '10px', fontWeight: '600' }}>Camila Díaz</span>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '9px',
                              background: '#F1DDD8',
                              color: '#8A3B2E',
                              fontSize: '7px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            No asiste
                          </span>
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
          </div>
        </div>
        <div className="lp-frow lp-rev">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
            <div className="lp-eyebrow" style={{ color: '#7A5B22', margin: '0' }}>
              El día de la fiesta
            </div>
            <h2 className="lp-h2" style={{ margin: '0' }}>
              Ingreso con código QR
            </h2>
            <p
              className="lp-lead"
              style={{ margin: '0', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)', maxWidth: '480px' }}
            >
              Al confirmar su asistencia, cada invitado ve su código QR en su invitación. En la entrada se escanea desde
              la app y el ingreso queda registrado.
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: '4px 0 0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                El QR se habilita al confirmar
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Escaneo desde la app
              </li>
              <li
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '17px', lineHeight: '1.5' }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    border: '1.5px solid #C9A45C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '1px',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A5B22"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Registro de los ingresos
              </li>
            </ul>
          </div>
          <div className="lp-qr-mock" style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '20px 0' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                width: '300px',
                height: '100%',
                marginLeft: '-150px',
                borderRadius: '999px 999px 24px 24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1.5px solid #C9A45C',
                opacity: '0.9',
              }}
            />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
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
                        width: '52px',
                        height: '13px',
                        borderRadius: '8px',
                        background: '#1F1812',
                        zIndex: '5',
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: '-40px', marginTop: '50px' }}>
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
                        <div
                          style={{
                            position: 'relative',
                            width: '234px',
                            height: '504px',
                            overflow: 'hidden',
                            fontFamily: "'Figtree', sans-serif",
                            boxSizing: 'border-box',
                            background: '#1A130C',
                            color: '#F7F1E6',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: '0',
                              top: '40px',
                              width: '100%',
                              textAlign: 'center',
                              fontSize: '13px',
                              fontWeight: '700',
                            }}
                          >
                            Escanear ingreso
                          </div>
                          <div
                            style={{ position: 'absolute', left: '52px', top: '90px', width: '130px', height: '130px' }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                width: '22px',
                                height: '22px',
                                boxSizing: 'border-box',
                                top: '0',
                                left: '0',
                                borderTop: '3px solid #E2C58A',
                                borderLeft: '3px solid #E2C58A',
                                borderRadius: '8px 0 0 0',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                width: '22px',
                                height: '22px',
                                boxSizing: 'border-box',
                                top: '0',
                                right: '0',
                                borderTop: '3px solid #E2C58A',
                                borderRight: '3px solid #E2C58A',
                                borderRadius: '0 8px 0 0',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                width: '22px',
                                height: '22px',
                                boxSizing: 'border-box',
                                bottom: '0',
                                left: '0',
                                borderBottom: '3px solid #E2C58A',
                                borderLeft: '3px solid #E2C58A',
                                borderRadius: '0 0 0 8px',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                width: '22px',
                                height: '22px',
                                boxSizing: 'border-box',
                                bottom: '0',
                                right: '0',
                                borderBottom: '3px solid #E2C58A',
                                borderRight: '3px solid #E2C58A',
                                borderRadius: '0 0 8px 0',
                              }}
                            />
                            <div style={{ position: 'absolute', left: '22px', top: '22px', opacity: '0.35' }}>
                              <svg
                                width="86"
                                height="86"
                                viewBox="0 0 86 86"
                                aria-hidden="true"
                                style={{ display: 'block' }}
                              >
                                <path
                                  d="M0.00 0.00h4.10v4.10h-4.10zM4.10 0.00h4.10v4.10h-4.10zM8.19 0.00h4.10v4.10h-4.10zM12.29 0.00h4.10v4.10h-4.10zM16.38 0.00h4.10v4.10h-4.10zM20.48 0.00h4.10v4.10h-4.10zM24.57 0.00h4.10v4.10h-4.10zM32.76 0.00h4.10v4.10h-4.10zM36.86 0.00h4.10v4.10h-4.10zM45.05 0.00h4.10v4.10h-4.10zM57.33 0.00h4.10v4.10h-4.10zM61.43 0.00h4.10v4.10h-4.10zM65.52 0.00h4.10v4.10h-4.10zM69.62 0.00h4.10v4.10h-4.10zM73.71 0.00h4.10v4.10h-4.10zM77.81 0.00h4.10v4.10h-4.10zM81.90 0.00h4.10v4.10h-4.10zM0.00 4.10h4.10v4.10h-4.10zM24.57 4.10h4.10v4.10h-4.10zM45.05 4.10h4.10v4.10h-4.10zM57.33 4.10h4.10v4.10h-4.10zM81.90 4.10h4.10v4.10h-4.10zM0.00 8.19h4.10v4.10h-4.10zM8.19 8.19h4.10v4.10h-4.10zM12.29 8.19h4.10v4.10h-4.10zM16.38 8.19h4.10v4.10h-4.10zM24.57 8.19h4.10v4.10h-4.10zM57.33 8.19h4.10v4.10h-4.10zM65.52 8.19h4.10v4.10h-4.10zM69.62 8.19h4.10v4.10h-4.10zM73.71 8.19h4.10v4.10h-4.10zM81.90 8.19h4.10v4.10h-4.10zM0.00 12.29h4.10v4.10h-4.10zM8.19 12.29h4.10v4.10h-4.10zM12.29 12.29h4.10v4.10h-4.10zM16.38 12.29h4.10v4.10h-4.10zM24.57 12.29h4.10v4.10h-4.10zM32.76 12.29h4.10v4.10h-4.10zM36.86 12.29h4.10v4.10h-4.10zM49.14 12.29h4.10v4.10h-4.10zM57.33 12.29h4.10v4.10h-4.10zM65.52 12.29h4.10v4.10h-4.10zM69.62 12.29h4.10v4.10h-4.10zM73.71 12.29h4.10v4.10h-4.10zM81.90 12.29h4.10v4.10h-4.10zM0.00 16.38h4.10v4.10h-4.10zM8.19 16.38h4.10v4.10h-4.10zM12.29 16.38h4.10v4.10h-4.10zM16.38 16.38h4.10v4.10h-4.10zM24.57 16.38h4.10v4.10h-4.10zM32.76 16.38h4.10v4.10h-4.10zM40.95 16.38h4.10v4.10h-4.10zM57.33 16.38h4.10v4.10h-4.10zM65.52 16.38h4.10v4.10h-4.10zM69.62 16.38h4.10v4.10h-4.10zM73.71 16.38h4.10v4.10h-4.10zM81.90 16.38h4.10v4.10h-4.10zM0.00 20.48h4.10v4.10h-4.10zM24.57 20.48h4.10v4.10h-4.10zM32.76 20.48h4.10v4.10h-4.10zM36.86 20.48h4.10v4.10h-4.10zM45.05 20.48h4.10v4.10h-4.10zM57.33 20.48h4.10v4.10h-4.10zM81.90 20.48h4.10v4.10h-4.10zM0.00 24.57h4.10v4.10h-4.10zM4.10 24.57h4.10v4.10h-4.10zM8.19 24.57h4.10v4.10h-4.10zM12.29 24.57h4.10v4.10h-4.10zM16.38 24.57h4.10v4.10h-4.10zM20.48 24.57h4.10v4.10h-4.10zM24.57 24.57h4.10v4.10h-4.10zM32.76 24.57h4.10v4.10h-4.10zM36.86 24.57h4.10v4.10h-4.10zM40.95 24.57h4.10v4.10h-4.10zM49.14 24.57h4.10v4.10h-4.10zM57.33 24.57h4.10v4.10h-4.10zM61.43 24.57h4.10v4.10h-4.10zM65.52 24.57h4.10v4.10h-4.10zM69.62 24.57h4.10v4.10h-4.10zM73.71 24.57h4.10v4.10h-4.10zM77.81 24.57h4.10v4.10h-4.10zM81.90 24.57h4.10v4.10h-4.10zM32.76 28.67h4.10v4.10h-4.10zM40.95 28.67h4.10v4.10h-4.10zM45.05 28.67h4.10v4.10h-4.10zM0.00 32.76h4.10v4.10h-4.10zM4.10 32.76h4.10v4.10h-4.10zM20.48 32.76h4.10v4.10h-4.10zM24.57 32.76h4.10v4.10h-4.10zM28.67 32.76h4.10v4.10h-4.10zM36.86 32.76h4.10v4.10h-4.10zM40.95 32.76h4.10v4.10h-4.10zM45.05 32.76h4.10v4.10h-4.10zM49.14 32.76h4.10v4.10h-4.10zM53.24 32.76h4.10v4.10h-4.10zM61.43 32.76h4.10v4.10h-4.10zM65.52 32.76h4.10v4.10h-4.10zM81.90 32.76h4.10v4.10h-4.10zM8.19 36.86h4.10v4.10h-4.10zM28.67 36.86h4.10v4.10h-4.10zM32.76 36.86h4.10v4.10h-4.10zM36.86 36.86h4.10v4.10h-4.10zM40.95 36.86h4.10v4.10h-4.10zM49.14 36.86h4.10v4.10h-4.10zM57.33 36.86h4.10v4.10h-4.10zM0.00 40.95h4.10v4.10h-4.10zM8.19 40.95h4.10v4.10h-4.10zM12.29 40.95h4.10v4.10h-4.10zM24.57 40.95h4.10v4.10h-4.10zM36.86 40.95h4.10v4.10h-4.10zM40.95 40.95h4.10v4.10h-4.10zM49.14 40.95h4.10v4.10h-4.10zM57.33 40.95h4.10v4.10h-4.10zM61.43 40.95h4.10v4.10h-4.10zM73.71 40.95h4.10v4.10h-4.10zM8.19 45.05h4.10v4.10h-4.10zM20.48 45.05h4.10v4.10h-4.10zM24.57 45.05h4.10v4.10h-4.10zM28.67 45.05h4.10v4.10h-4.10zM36.86 45.05h4.10v4.10h-4.10zM40.95 45.05h4.10v4.10h-4.10zM49.14 45.05h4.10v4.10h-4.10zM53.24 45.05h4.10v4.10h-4.10zM57.33 45.05h4.10v4.10h-4.10zM61.43 45.05h4.10v4.10h-4.10zM65.52 45.05h4.10v4.10h-4.10zM77.81 45.05h4.10v4.10h-4.10zM0.00 49.14h4.10v4.10h-4.10zM4.10 49.14h4.10v4.10h-4.10zM8.19 49.14h4.10v4.10h-4.10zM20.48 49.14h4.10v4.10h-4.10zM24.57 49.14h4.10v4.10h-4.10zM28.67 49.14h4.10v4.10h-4.10zM32.76 49.14h4.10v4.10h-4.10zM45.05 49.14h4.10v4.10h-4.10zM49.14 49.14h4.10v4.10h-4.10zM53.24 49.14h4.10v4.10h-4.10zM57.33 49.14h4.10v4.10h-4.10zM69.62 49.14h4.10v4.10h-4.10zM81.90 49.14h4.10v4.10h-4.10zM36.86 53.24h4.10v4.10h-4.10zM40.95 53.24h4.10v4.10h-4.10zM45.05 53.24h4.10v4.10h-4.10zM57.33 53.24h4.10v4.10h-4.10zM69.62 53.24h4.10v4.10h-4.10zM73.71 53.24h4.10v4.10h-4.10zM77.81 53.24h4.10v4.10h-4.10zM0.00 57.33h4.10v4.10h-4.10zM4.10 57.33h4.10v4.10h-4.10zM8.19 57.33h4.10v4.10h-4.10zM12.29 57.33h4.10v4.10h-4.10zM16.38 57.33h4.10v4.10h-4.10zM20.48 57.33h4.10v4.10h-4.10zM24.57 57.33h4.10v4.10h-4.10zM32.76 57.33h4.10v4.10h-4.10zM36.86 57.33h4.10v4.10h-4.10zM45.05 57.33h4.10v4.10h-4.10zM49.14 57.33h4.10v4.10h-4.10zM53.24 57.33h4.10v4.10h-4.10zM61.43 57.33h4.10v4.10h-4.10zM65.52 57.33h4.10v4.10h-4.10zM73.71 57.33h4.10v4.10h-4.10zM0.00 61.43h4.10v4.10h-4.10zM24.57 61.43h4.10v4.10h-4.10zM32.76 61.43h4.10v4.10h-4.10zM45.05 61.43h4.10v4.10h-4.10zM49.14 61.43h4.10v4.10h-4.10zM61.43 61.43h4.10v4.10h-4.10zM65.52 61.43h4.10v4.10h-4.10zM69.62 61.43h4.10v4.10h-4.10zM81.90 61.43h4.10v4.10h-4.10zM0.00 65.52h4.10v4.10h-4.10zM8.19 65.52h4.10v4.10h-4.10zM12.29 65.52h4.10v4.10h-4.10zM16.38 65.52h4.10v4.10h-4.10zM24.57 65.52h4.10v4.10h-4.10zM36.86 65.52h4.10v4.10h-4.10zM69.62 65.52h4.10v4.10h-4.10zM73.71 65.52h4.10v4.10h-4.10zM0.00 69.62h4.10v4.10h-4.10zM8.19 69.62h4.10v4.10h-4.10zM12.29 69.62h4.10v4.10h-4.10zM16.38 69.62h4.10v4.10h-4.10zM24.57 69.62h4.10v4.10h-4.10zM32.76 69.62h4.10v4.10h-4.10zM45.05 69.62h4.10v4.10h-4.10zM53.24 69.62h4.10v4.10h-4.10zM65.52 69.62h4.10v4.10h-4.10zM69.62 69.62h4.10v4.10h-4.10zM73.71 69.62h4.10v4.10h-4.10zM77.81 69.62h4.10v4.10h-4.10zM81.90 69.62h4.10v4.10h-4.10zM0.00 73.71h4.10v4.10h-4.10zM8.19 73.71h4.10v4.10h-4.10zM12.29 73.71h4.10v4.10h-4.10zM16.38 73.71h4.10v4.10h-4.10zM24.57 73.71h4.10v4.10h-4.10zM32.76 73.71h4.10v4.10h-4.10zM61.43 73.71h4.10v4.10h-4.10zM73.71 73.71h4.10v4.10h-4.10zM77.81 73.71h4.10v4.10h-4.10zM81.90 73.71h4.10v4.10h-4.10zM0.00 77.81h4.10v4.10h-4.10zM24.57 77.81h4.10v4.10h-4.10zM45.05 77.81h4.10v4.10h-4.10zM53.24 77.81h4.10v4.10h-4.10zM57.33 77.81h4.10v4.10h-4.10zM65.52 77.81h4.10v4.10h-4.10zM69.62 77.81h4.10v4.10h-4.10zM77.81 77.81h4.10v4.10h-4.10zM81.90 77.81h4.10v4.10h-4.10zM0.00 81.90h4.10v4.10h-4.10zM4.10 81.90h4.10v4.10h-4.10zM8.19 81.90h4.10v4.10h-4.10zM12.29 81.90h4.10v4.10h-4.10zM16.38 81.90h4.10v4.10h-4.10zM20.48 81.90h4.10v4.10h-4.10zM24.57 81.90h4.10v4.10h-4.10zM36.86 81.90h4.10v4.10h-4.10zM45.05 81.90h4.10v4.10h-4.10zM49.14 81.90h4.10v4.10h-4.10zM57.33 81.90h4.10v4.10h-4.10zM69.62 81.90h4.10v4.10h-4.10zM77.81 81.90h4.10v4.10h-4.10z"
                                  fill="#E8DCC4"
                                />
                              </svg>
                            </div>
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              left: '0',
                              top: '232px',
                              width: '100%',
                              textAlign: 'center',
                              fontSize: '9px',
                              color: '#E8DCC4',
                            }}
                          >
                            Apuntá al QR del invitado
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              left: '0',
                              bottom: '0',
                              width: '100%',
                              boxSizing: 'border-box',
                              background: '#FFFDF8',
                              color: '#2E2418',
                              borderRadius: '18px 18px 0 0',
                              padding: '14px 14px 16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  width: '26px',
                                  height: '26px',
                                  borderRadius: '13px',
                                  background: '#E6EDD8',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#3F5223"
                                  strokeWidth="2.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </span>
                              <span style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '12px', fontWeight: '700' }}>Invitado válido</span>
                                <span style={{ fontSize: '8px', color: '#6B5A44' }}>Sofía Pérez · 2 personas</span>
                              </span>
                            </div>
                            <div
                              style={{
                                height: '28px',
                                borderRadius: '14px',
                                background: '#8A6A2F',
                                color: '#FFFDF8',
                                fontSize: '9px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              Registrar ingreso
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
                          width: '52px',
                          height: '13px',
                          borderRadius: '8px',
                          background: '#1F1812',
                          zIndex: '5',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
