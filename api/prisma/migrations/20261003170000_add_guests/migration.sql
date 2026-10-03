-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('pending', 'confirmed', 'declined');

-- DropIndex
DROP INDEX "events_owner_id_idx";

-- CreateTable
CREATE TABLE "guest_groups" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "invite_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GuestStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guest_groups_invite_token_key" ON "guest_groups"("invite_token");

-- CreateIndex
CREATE INDEX "guest_groups_event_id_idx" ON "guest_groups"("event_id");

-- CreateIndex
CREATE INDEX "guests_group_id_idx" ON "guests"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_owner_id_key" ON "events"("owner_id");

-- AddForeignKey
ALTER TABLE "guest_groups" ADD CONSTRAINT "guest_groups_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "guest_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Seguridad: igual que events, estas tablas solo se usan a través de la API.
ALTER TABLE "guest_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "guests" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "guest_groups" FROM anon, authenticated;
REVOKE ALL ON TABLE "guests" FROM anon, authenticated;
