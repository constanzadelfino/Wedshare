import { DecoDivider, DecoFan, NightStars } from '../components/TemplateDecor';
import { Invitation } from '../models/Invitation';
import { TemplateId } from '../models/Template';
import { coupleInitials, splitCoupleNames } from '../utils/names';

// Anchos de las fotos según cuántas haya (la del medio es la más grande).
const PHOTO_WIDTHS: Record<number, string[]> = {
  1: ['40%'],
  2: ['32%', '32%'],
  3: ['24%', '34%', '24%'],
};

type Props = { invitation: Invitation; template: TemplateId };

// Portada: nombres de los novios, "¡Nos casamos!", las fotos y para quién es la invitación.
// Cada plantilla tiene la suya; los textos son los mismos.
export function CoverSection({ invitation, template }: Props) {
  const photos = invitation.event.coverWithoutPhotos ? [] : invitation.event.coverPhotoUrls.slice(0, 3);

  if (template === 'rosa') {
    return <RosaCover invitation={invitation} photo={photos[0]} />;
  }
  if (template === 'minimal') {
    return <MinimalCover invitation={invitation} photo={photos[0]} />;
  }
  if (template === 'noche') {
    return <NocheCover invitation={invitation} />;
  }
  return <DoradoCover invitation={invitation} photos={photos} />;
}

// Dorado clásico: fondo cacao y fotos en arco con doble marco dorado.
function DoradoCover({ invitation, photos }: { invitation: Invitation; photos: string[] }) {
  return (
    <header className="relative rounded-b-[44px] bg-dark text-bg">
      <div className="wrap pt-14 pb-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <CoupleNames invitation={invitation} nameClass="text-bg" />
          <Headline casamosClass="text-gold" subtitleClass="text-mdark" />
          {photos.length > 0 && (
            <div className="mx-auto mt-2.5 flex w-full max-w-[440px] items-end justify-center gap-[22px]">
              {photos.map((url, index) => (
                <div
                  key={url}
                  className="photo-frame mx-auto my-2 aspect-[3/4] rounded-[999px_999px_18px_18px] border-[1.5px] border-gold p-2 outline-1 outline-offset-[7px] outline-gold"
                  style={{ width: PHOTO_WIDTHS[photos.length][index] }}
                >
                  <img
                    src={url}
                    alt=""
                    className="block h-full w-full rounded-[999px_999px_10px_10px] bg-gold/15 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <GuestPill invitation={invitation} className="text-bg" />
        </div>
      </div>
    </header>
  );
}

// Rosa romántico: una foto grande con el borde de abajo redondeado y una tarjeta encima.
function RosaCover({ invitation, photo }: { invitation: Invitation; photo?: string }) {
  return (
    <header className="relative bg-bg text-ink">
      {photo ? (
        <img
          src={photo}
          alt=""
          className="block aspect-[4/5] max-h-[640px] w-full rounded-b-[160px] border-b-[1.5px] border-gold bg-soft object-cover"
        />
      ) : (
        <div className="h-[220px] rounded-b-[160px] border-b-[1.5px] border-gold bg-soft" />
      )}
      <div className="wrap relative z-[2] -mt-[150px] pb-14">
        <div className="card flex flex-col items-center gap-3.5 px-[22px] py-8 text-center outline-1 -outline-offset-[9px] outline-gold">
          <CoupleNames invitation={invitation} nameClass="text-ink" />
          <Headline casamosClass="text-accent" subtitleClass="text-muted" />
          <GuestPill invitation={invitation} className="text-ink" />
        </div>
      </div>
    </header>
  );
}

// Noche azul (art déco): sin fotos, con las iniciales en un rombo de doble marco, estrellitas,
// una línea con rombos y un abanico.
function NocheCover({ invitation }: { invitation: Invitation }) {
  const initials = coupleInitials(invitation.event.coupleNames);
  const names = splitCoupleNames(invitation.event.coupleNames);
  return (
    <header className="relative overflow-hidden bg-dark text-bg">
      <NightStars />
      <div className="wrap relative pt-14 pb-14">
        <div className="flex flex-col items-center gap-4 text-center">
          {initials.length > 0 && (
            <div
              className="mx-auto mt-4 mb-8 flex h-[150px] w-[150px] rotate-45 items-center justify-center border-[1.5px] border-gold outline-1 outline-offset-[6px] outline-gold"
              aria-hidden="true"
            >
              <span className="flex -rotate-45 items-center gap-1 font-display text-[46px] leading-none font-light">
                {initials[0]}
                {initials[1] && (
                  <>
                    <span className="text-[24px] text-gold">&amp;</span>
                    {initials[1]}
                  </>
                )}
              </span>
            </div>
          )}
          <h1 className="names m-0 text-bg">{names.length === 2 ? `${names[0]} & ${names[1]}` : (names[0] ?? invitation.event.name)}</h1>
          <div className="w-full">
            <DecoDivider />
          </div>
          <p className="m-0 font-display text-[24px] font-light tracking-[0.2em] text-gold uppercase">¡Nos casamos!</p>
          <p className="m-0 text-[18px] text-mdark">y queremos compartirlo con vos</p>
          <div className="my-2">
            <DecoFan width={140} />
          </div>
          <GuestPill invitation={invitation} className="text-bg" />
        </div>
      </div>
    </header>
  );
}

// Minimalista: la fecha chica, los nombres grandes alineados a la izquierda, una línea fina y
// una foto grande en blanco y negro, sin marco.
function MinimalCover({ invitation, photo }: { invitation: Invitation; photo?: string }) {
  const { event } = invitation;
  const names = splitCoupleNames(event.coupleNames);
  const [year, month, day] = event.date.split('-');
  return (
    <header className="bg-bg text-ink">
      <div className="wrap max-w-[640px] pt-12 pb-10">
        <p className="m-0 text-[12px] tracking-[0.32em] text-muted">
          {day} · {month} · {year}
        </p>
        <h1 className="names mt-5 mb-0 text-ink">
          {names.length === 2 ? (
            <>
              {names[0]}
              <br />& {names[1]}
            </>
          ) : (
            (names[0] ?? event.name)
          )}
        </h1>
        <span className="my-6 block h-px bg-ink" />
        {photo && <img src={photo} alt="" className="block aspect-[4/5] w-full object-cover grayscale" />}
        <p className="mt-4 mb-0 font-display text-[22px] font-light">¡Nos casamos!</p>
        <p className="m-0 text-[16px] text-muted">y queremos compartirlo con vos</p>
        <GuestPill invitation={invitation} className="text-ink" />
      </div>
    </header>
  );
}

function CoupleNames({ invitation, nameClass }: { invitation: Invitation; nameClass: string }) {
  const names = splitCoupleNames(invitation.event.coupleNames);
  return (
    <h1 className="m-0 flex w-full flex-col items-center gap-4 font-normal">
      {names.length === 2 ? (
        <>
          <span className={`names ${nameClass}`}>{names[0]}</span>
          <span className="flex w-full max-w-[220px] items-center gap-3.5">
            <span className="h-px flex-1 bg-gold" />
            <span className="font-display text-[30px] leading-none font-light text-gold">&amp;</span>
            <span className="h-px flex-1 bg-gold" />
          </span>
          <span className={`names ${nameClass}`}>{names[1]}</span>
        </>
      ) : (
        <span className={`names ${nameClass}`}>{names[0] ?? invitation.event.name}</span>
      )}
    </h1>
  );
}

function Headline({ casamosClass, subtitleClass }: { casamosClass: string; subtitleClass: string }) {
  return (
    <>
      <p className={`m-0 mt-2.5 font-display text-[32px] font-normal ${casamosClass}`}>¡Nos casamos!</p>
      <p className={`m-0 text-[18px] ${subtitleClass}`}>y queremos compartirlo con vos</p>
    </>
  );
}

function GuestPill({ invitation, className }: { invitation: Invitation; className: string }) {
  const count = invitation.group.guests.length;
  return (
    <span
      className={`mt-1.5 inline-flex min-h-9 items-center rounded-[18px] border border-gold px-4 py-1.5 text-[14px] font-semibold ${className}`}
    >
      Invitación para {invitation.group.name} · {count} {count === 1 ? 'persona' : 'personas'}
    </span>
  );
}
