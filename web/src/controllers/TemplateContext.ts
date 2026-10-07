import { createContext, useContext } from 'react';

import { DEFAULT_TEMPLATE, TemplateId } from '../models/Template';

// La plantilla de la invitación, para las piezas que cambian de forma según la plantilla
// (adornos, portada, marcadores). Los colores no la necesitan: salen de las variables de CSS.
export const TemplateContext = createContext<TemplateId>(DEFAULT_TEMPLATE);

export function useTemplateId() {
  return useContext(TemplateContext);
}
