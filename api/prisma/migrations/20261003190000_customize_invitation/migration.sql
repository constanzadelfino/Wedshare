-- AlterTable
ALTER TABLE "events" ADD COLUMN     "couple_names" TEXT,
ADD COLUMN     "cover_photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "cover_without_photos" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dress_code" TEXT,
ADD COLUMN     "rsvp_deadline" DATE,
ADD COLUMN     "welcome_message" TEXT;

-- CreateTable
CREATE TABLE "event_items" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "venue_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "place_id" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_items_event_id_idx" ON "event_items"("event_id");

-- AddForeignKey
ALTER TABLE "event_items" ADD CONSTRAINT "event_items_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Seguridad: igual que las demás tablas, solo se usa a través de la API.
ALTER TABLE "event_items" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "event_items" FROM anon, authenticated;
