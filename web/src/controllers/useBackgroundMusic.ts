import { useEffect, useRef, useState } from 'react';

import { BACKGROUND_MUSIC } from '../utils/music';

// Música de fondo de la invitación. Los celulares no dejan que suene sola: arranca cuando el
// invitado toca el sello del sobre (play) o el botón de música, y se puede pausar.
export function useBackgroundMusic(musicId: string | null) {
  const track = musicId ? BACKGROUND_MUSIC[musicId] ?? null : null;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!track) {
      return;
    }
    const audio = new Audio(track.file);
    audio.loop = true;
    audio.preload = 'none';
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audioRef.current = null;
    };
  }, [track]);

  function play() {
    // Si el celular la bloquea igual, queda el botón para darle play.
    audioRef.current?.play().catch(() => setPlaying(false));
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  }

  return { track, playing, play, toggle };
}
