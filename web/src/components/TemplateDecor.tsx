// Adornos de la plantilla Noche azul (art déco): línea con rombos, abanico y estrellitas.
// Dibujos propios en línea fina; toman el color dorado de la plantilla.

export function DecoDivider() {
  return (
    <svg
      width="300"
      height="20"
      viewBox="0 0 300 20"
      className="mx-auto block max-w-full text-gold"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M0 10H118M182 10H300M0 14H100M200 14H300" strokeWidth="0.9" />
      <path d="M150 1l9 9-9 9-9-9z" />
      <path d="M150 6l4 4-4 4-4-4z" fill="currentColor" stroke="none" />
      <path d="M128 10l4-4 4 4-4 4zM164 10l4-4 4 4-4 4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Medio abanico de rayos, como los de las fachadas art déco.
export function DecoFan({ width = 120 }: { width?: number }) {
  const rays = Array.from({ length: 13 }, (_, index) => {
    const angle = Math.PI * (index / 12);
    return { x: 60 - Math.cos(angle) * 56, y: 60 - Math.sin(angle) * 56 };
  });
  return (
    <svg
      width={width}
      height={width / 2}
      viewBox="0 0 120 60"
      className="mx-auto block text-gold"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {rays.map((ray, index) => (
        <line key={index} x1="60" y1="60" x2={ray.x.toFixed(1)} y2={ray.y.toFixed(1)} strokeWidth="0.9" />
      ))}
      <path d="M4 60a56 56 0 0 1 112 0" strokeWidth="1.2" />
      <path d="M24 60a36 36 0 0 1 72 0" />
    </svg>
  );
}

// Estrellitas de cuatro puntas dispersas sobre las secciones oscuras.
const STARS = [
  { x: 8, y: 14, size: 4 },
  { x: 90, y: 22, size: 5 },
  { x: 16, y: 70, size: 3 },
  { x: 84, y: 82, size: 3 },
  { x: 50, y: 6, size: 3 },
];

export function NightStars() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full text-gold opacity-70" aria-hidden="true">
      {STARS.map((star, index) => (
        <svg key={index} x={`${star.x}%`} y={`${star.y}%`} overflow="visible">
          <path
            d={`M0 ${-star.size}L${star.size * 0.28} ${-star.size * 0.28}L${star.size} 0L${star.size * 0.28} ${star.size * 0.28}L0 ${star.size}L${-star.size * 0.28} ${star.size * 0.28}L${-star.size} 0L${-star.size * 0.28} ${-star.size * 0.28}Z`}
            fill="currentColor"
          />
        </svg>
      ))}
    </svg>
  );
}
