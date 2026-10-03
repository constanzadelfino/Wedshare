// Encabezado de sección: texto chico en mayúsculas y título grande.
export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="eyebrow text-accent">{eyebrow}</div>
      <h2 className="h2 text-ink">{title}</h2>
    </div>
  );
}
