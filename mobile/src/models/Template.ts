// Plantillas de la invitación (las mismas que la web). Los colores son los de cada plantilla,
// para dibujar su miniatura en "Elegí una plantilla".
export type TemplateId = 'dorado' | 'rosa' | 'noche' | 'minimal';

export type TemplateInfo = {
  id: TemplateId;
  name: string;
  // Una palabra que la describe, debajo del nombre.
  style: string;
  colors: {
    // Fondo de la portada, fondo de la invitación, acento (líneas y adornos) y texto.
    cover: string;
    background: string;
    accent: string;
    ink: string;
  };
};

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'dorado',
    name: 'Dorado clásico',
    style: 'Clásica',
    colors: { cover: '#2A1F14', background: '#F7F1E6', accent: '#C9A45C', ink: '#F7F1E6' },
  },
  {
    id: 'rosa',
    name: 'Rosa romántico',
    style: 'Romántica',
    colors: { cover: '#F3DDD8', background: '#FBF1EE', accent: '#D4958F', ink: '#3B1F26' },
  },
  {
    id: 'noche',
    name: 'Noche azul',
    style: 'Art déco',
    colors: { cover: '#1B2740', background: '#F4F2EC', accent: '#D9B873', ink: '#F4F2EC' },
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    style: 'Moderna',
    colors: { cover: '#FFFFFF', background: '#FFFFFF', accent: '#111111', ink: '#111111' },
  },
];
