-- Google Calendar de los novios: token cifrado, cuenta conectada e ids de los eventos en Google.
ALTER TABLE "event_items" ADD COLUMN     "google_event_id" TEXT;

ALTER TABLE "events" ADD COLUMN     "calendar_all_day_id" TEXT,
ADD COLUMN     "calendar_email" TEXT,
ADD COLUMN     "calendar_refresh_token" TEXT,
ALTER COLUMN "calendar_sync" SET DEFAULT false;

-- Hasta ahora el interruptor no hacía nada; nadie tiene el calendario conectado todavía.
UPDATE "events" SET "calendar_sync" = false;
