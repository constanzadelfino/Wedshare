// Encabezado de sección: texto chico en mayúsculas y título grande.
// Centrado, salvo en Minimalista (tpl-align).
export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="tpl-align">
      <div className="eyebrow text-accent">{eyebrow}</div>
      <h2 className="h2 text-ink">{title}</h2>
    </div>
  );
}
