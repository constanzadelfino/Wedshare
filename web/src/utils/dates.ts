const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// Las fechas llegan como AAAA-MM-DD y se muestran tal cual, sin pasar por la zona horaria.
function parts(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return { year, month, day };
}

// "14 de noviembre"
export function dayAndMonth(date: string) {
  const { month, day } = parts(date);
  return `${day} de ${MONTHS[month - 1]}`;
}

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// "Viernes 19 de marzo"
export function weekdayAndDate(date: string) {
  const { year, month, day } = parts(date);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday} ${dayAndMonth(date)}`;
}

export function dayNumber(date: string) {
  return String(parts(date).day).padStart(2, '0');
}

export function monthName(date: string) {
  return MONTHS[parts(date).month - 1];
}

// Momento exacto en horario de Argentina (UTC-3, sin horario de verano).
export function argentinaTime(date: string, time = '00:00') {
  return new Date(`${date}T${time}:00-03:00`);
}
