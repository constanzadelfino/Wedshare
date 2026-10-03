// Un casamiento, tal como lo devuelve la API.
export type Event = {
  id: string;
  name: string;
  // Formato AAAA-MM-DD.
  date: string;
  venue: string;
  calendarSync: boolean;
  playlistEnabled: boolean;
  giftsEnabled: boolean;
};

export type NewEvent = Omit<Event, 'id'>;
