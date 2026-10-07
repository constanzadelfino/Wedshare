import { SectionTitle } from '../components/SectionTitle';

// Reproductor de Spotify a partir del link de la playlist (con o sin parámetros al final).
// El color del reproductor lo toma Spotify de la portada de la playlist: por eso Wedshare les
// ofrece a los novios portadas con los colores de la plantilla.
function embedUrl(url: string) {
  const id = /\/playlist\/([A-Za-z0-9]+)/.exec(url)?.[1];
  return id ? `https://open.spotify.com/embed/playlist/${id}` : null;
}

// El link de "Invitar colaboradores" de Spotify trae pt=...: con ese, los invitados suman canciones.
function isCollaborativeLink(url: string) {
  return /[?&]pt=/.test(url);
}

// Playlist: la playlist de Spotify de los novios, con el reproductor de Spotify (no usa su API).
// Si los novios pegaron el link para colaborar, el botón invita a sumar canciones.
export function PlaylistSection({ url }: { url: string }) {
  const embed = embedUrl(url);
  const collaborative = isCollaborativeLink(url);

  return (
    <section id="playlist" className="sec">
      <div className="wrap max-w-[640px]">
        <SectionTitle eyebrow="Playlist" title="Armemos la fiesta juntos" />
        <p className="tpl-align mx-auto mt-0 mb-6 max-w-[520px] text-[17px] leading-[1.55] text-muted">
          {collaborative
            ? 'Sumá las canciones que no pueden faltar. Se abre Spotify y las agregás a nuestra playlist.'
            : 'Estas son las canciones que elegimos para ese día, por si querés ir escuchándolas.'}
        </p>
        {embed && (
          <iframe
            title="Playlist de Spotify de los novios"
            src={embed}
            className="block w-full rounded-2xl border-0"
            height={352}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
        <div className="tpl-align mt-5">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            {collaborative ? 'Sumá tus canciones' : 'Abrir en Spotify'}
          </a>
        </div>
      </div>
    </section>
  );
}
