// También incluye: las secciones opcionales de la invitación.
export function ExtrasSection() {
  return (
    <section className="lp-sec">
      <div className="lp-wrap">
        <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '760px' }}>
          <div className="lp-eyebrow" style={{ color: '#7A5B22' }}>
            También incluye
          </div>
          <h2 className="lp-h2" style={{ color: '#2E2418' }}>
            Secciones opcionales
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
            Podés activar solo las secciones que quieras mostrar.
          </p>
        </div>
        <div className="lp-grid3" style={{ marginTop: '40px' }}>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Cuenta regresiva</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Con un botón para agendar la fecha en Google Calendar.
            </div>
          </div>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Eventos</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Civil, ceremonia y festejo, cada uno con su dirección y cómo llegar.
            </div>
          </div>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="8" width="18" height="4" />
                <path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Regalos</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Cuenta bancaria, buzón en el salón o lista de regalos.
            </div>
          </div>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Playlist</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              El reproductor de tu playlist de Spotify, para escucharla o sumar canciones.
            </div>
          </div>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h4l2-3h6l2 3h4v12H3z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Historia y fotos</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Un espacio para contar su historia y un álbum de fotos.
            </div>
          </div>
          <div
            style={{
              background: '#FFFDF8',
              border: '1px solid color-mix(in srgb, #2E2418 14%, #F7F1E6)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 14px 34px rgba(46,36,24,0.06)',
            }}
          >
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: 'color-mix(in srgb, #7A5B22 10%, #F7F1E6)',
                border: '1px solid #C9A45C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5B22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <div style={{ fontSize: '19px', fontWeight: '700' }}>Sobre de apertura</div>
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'color-mix(in srgb, #2E2418 72%, #F7F1E6)' }}>
              Un sello con las iniciales de los novios que se abre al entrar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
