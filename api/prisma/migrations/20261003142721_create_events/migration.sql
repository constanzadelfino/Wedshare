-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "venue" TEXT NOT NULL,
    "calendar_sync" BOOLEAN NOT NULL DEFAULT true,
    "playlist_enabled" BOOLEAN NOT NULL DEFAULT true,
    "gifts_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_owner_id_idx" ON "events"("owner_id");

-- Seguridad: la tabla solo se usa a través de la API.
-- Con RLS activado y sin políticas, nadie puede leerla ni escribirla con la clave pública de Supabase.
ALTER TABLE "events" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "events" FROM anon, authenticated;
