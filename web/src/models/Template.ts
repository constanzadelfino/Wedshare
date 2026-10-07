// Plantillas de la invitación. Cada una cambia los colores (variables --tpl-* de index.css),
// la fuente de los títulos, la portada, los adornos y la forma de algunas piezas (esquinas,
// cuenta regresiva, marcadores de los eventos). Las secciones y los textos son los mismos.
export type TemplateId = 'dorado' | 'rosa' | 'noche' | 'minimal';

export const DEFAULT_TEMPLATE: TemplateId = 'dorado';

// Fuente de títulos de cada plantilla, de Google Fonts. Dorado clásico usa Figtree, que ya
// se carga para toda la página.
export const TEMPLATE_FONTS: Record<TemplateId, string | null> = {
  dorado: null,
  rosa: 'Gilda+Display',
  noche: 'Josefin+Sans:wght@300;400;600',
  minimal: 'Jost:wght@300;400;500',
};

export function isTemplateId(value: string | null): value is TemplateId {
  return value !== null && value in TEMPLATE_FONTS;
}
