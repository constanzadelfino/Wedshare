import { useEffect } from 'react';

import { TEMPLATE_FONTS, TemplateId } from '../models/Template';

// Aplica la plantilla a toda la página: marca el <html> (index.css cambia los colores y los
// títulos según data-template) y carga la fuente de títulos si hace falta.
export function useTemplate(template: TemplateId) {
  useEffect(() => {
    document.documentElement.dataset.template = template;

    const family = TEMPLATE_FONTS[template];
    if (!family) {
      return;
    }
    const href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }, [template]);
}
