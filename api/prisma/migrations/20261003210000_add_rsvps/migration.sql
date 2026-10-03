-- AlterTable
ALTER TABLE "guest_groups" ADD COLUMN     "entry_code" TEXT;

-- AlterTable
ALTER TABLE "guests" ADD COLUMN     "dietary" TEXT;

-- CreateTable
CREATE TABLE "rsvps" (
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_group_id_key" ON "rsvps"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "guest_groups_entry_code_key" ON "guest_groups"("entry_code");

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "guest_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;



-- Seguridad: igual que las demás tablas, solo se usa a través de la API.
ALTER TABLE "rsvps" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "rsvps" FROM anon, authenticated;
