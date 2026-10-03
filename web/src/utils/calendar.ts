// Link para agendar el casamiento en Google Calendar. Es un link común de Google
// (no usa su API): abre el evento ya completo para que el invitado lo guarde.
export function googleCalendarUrl(options: {
  title: string;
  start: Date;
  location: string;
  details?: string;
}) {
  // Si no se sabe cuándo termina, se agenda con una duración de 6 horas.
  const end = new Date(options.start.getTime() + 6 * 60 * 60 * 1000);
  const format = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: options.title,
    dates: `${format(options.start)}/${format(end)}`,
    location: options.location,
    ctz: 'America/Argentina/Buenos_Aires',
  });
  if (options.details) {
    params.set('details', options.details);
  }
  return `https://calendar.google.com/calendar/render?${params}`;
}
