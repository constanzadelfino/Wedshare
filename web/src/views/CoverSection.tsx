import { Invitation } from '../models/Invitation';
import { splitCoupleNames } from '../utils/names';

// Anchos de las fotos en arco según cuántas haya (la del medio es la más grande).
const PHOTO_WIDTHS: Record<number, string[]> = {
  1: ['40%'],
  2: ['32%', '32%'],
  3: ['24%', '34%', '24%'],
};

// Portada: nombres de los novios, "¡Nos casamos!", hasta 3 fotos y para quién es la invitación.
export function CoverSection({ invitation }: { invitation: Invitation }) {
  const { event, group } = invitation;
  const names = splitCoupleNames(event.coupleNames);
  const photos = event.coverWithoutPhotos ? [] : event.coverPhotoUrls.slice(0, 3);
  const count = group.guests.length;

  return (
    <header className="relative rounded-b-[44px] bg-dark text-bg">
      <div className="wrap pt-14 pb-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="m-0 flex w-full flex-col items-center gap-4 font-normal">
            {names.length === 2 ? (
              <>
                <span className="names text-bg">{names[0]}</span>
                <span className="flex w-full max-w-[220px] items-center gap-3.5">
                  <span className="h-px flex-1 bg-gold" />
                  <span className="font-display text-[30px] leading-none font-light text-gold">&amp;</span>
                  <span className="h-px flex-1 bg-gold" />
                </span>
                <span className="names text-bg">{names[1]}</span>
              </>
            ) : (
              <span className="names text-bg">{names[0] ?? event.name}</span>
            )}
          </h1>

          <p className="m-0 mt-2.5 font-display text-[32px] font-normal text-gold">¡Nos casamos!</p>
          <p className="m-0 text-[18px] text-mdark">y queremos compartirlo con vos</p>

          {photos.length > 0 && (
            <div className="mx-auto mt-2.5 flex w-full max-w-[440px] items-end justify-center gap-[22px]">
              {photos.map((url, index) => (
                <div
                  key={url}
                  className="mx-auto my-2 aspect-[3/4] rounded-[999px_999px_18px_18px] border-[1.5px] border-gold p-2 outline-1 outline-offset-[7px] outline-gold"
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

          <span className="mt-1.5 inline-flex min-h-9 items-center rounded-[18px] border border-gold px-4 py-1.5 text-[14px] font-semibold text-bg">
            Invitación para {group.name} · {count} {count === 1 ? 'persona' : 'personas'}
          </span>
        </div>
      </div>
    </header>
  );
}
