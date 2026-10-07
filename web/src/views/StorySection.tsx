import { SectionTitle } from '../components/SectionTitle';

type Story = { title: string | null; text: string | null; photoUrl: string | null };

// Nuestra historia: la foto en arco (como la portada) y el texto de los novios, separado
// en párrafos donde ellos dejaron una línea en blanco.
export function StorySection({ story }: { story: Story }) {
  const paragraphs = (story.text ?? '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);

  return (
    <section id="historia" className="sec bg-soft">
      <div className="wrap">
        {/* Sin título propio, la sección dice solo "Nuestra historia". */}
        {story.title ? (
          <SectionTitle eyebrow="Nuestra historia" title={story.title} />
        ) : (
          <div className="tpl-align">
            <h2 className="h2 text-ink">Nuestra historia</h2>
          </div>
        )}
        <div className="h-5" />
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-x-10 gap-y-7 md:flex-row">
          {story.photoUrl && (
            <div className="photo-frame mx-auto my-2 aspect-[4/5] w-[260px] shrink-0 rounded-[999px_999px_18px_18px] border-[1.5px] border-gold p-2 outline-1 outline-offset-[7px] outline-gold">
              <img
                src={story.photoUrl}
                alt="Foto de los novios"
                className="block h-full w-full rounded-[999px_999px_10px_10px] bg-gold/15 object-cover"
              />
            </div>
          )}
          {paragraphs.length > 0 && (
            <div className="flex max-w-[520px] flex-col gap-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="m-0 text-[17px] leading-[1.65] whitespace-pre-line text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
