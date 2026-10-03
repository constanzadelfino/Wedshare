import { useEffect, useState } from 'react';

export type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function remaining(target: Date): Countdown {
  const total = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

// Tiempo que falta hasta la fecha, actualizado cada segundo. Al llegar, queda en cero.
export function useCountdown(target: Date) {
  const time = target.getTime();
  const [countdown, setCountdown] = useState(() => remaining(target));

  useEffect(() => {
    const date = new Date(time);
    setCountdown(remaining(date));
    const timer = setInterval(() => setCountdown(remaining(date)), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return countdown;
}
