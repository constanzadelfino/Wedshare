// Canciones de fondo que ofrece Wedshare: grabaciones libres en public/music (ver CREDITOS.md).
// credit: lo que piden las licencias CC BY y CC BY-SA (intérprete y licencia); null si no hace falta.
export const BACKGROUND_MUSIC: Record<string, { title: string; file: string; credit: string | null }> = {
  canon: {
    title: 'Canon en re (Pachelbel)',
    file: '/music/canon.mp3',
    credit: 'Interpretado por Lee Galloway · CC BY-SA 3.0',
  },
  'clair-de-lune': {
    title: 'Claro de luna (Debussy)',
    file: '/music/clair-de-lune.mp3',
    credit: 'Interpretado por Laurens Goedhart · CC BY 3.0',
  },
};
