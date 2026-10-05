-- CreateEnum
CREATE TYPE "GiftMethod" AS ENUM ('payment', 'product', 'transfer');

-- CreateEnum
CREATE TYPE "GiftType" AS ENUM ('savings', 'honeymoon', 'experience', 'home', 'baby', 'other');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "gift_alias" TEXT,
ADD COLUMN     "gift_bank" TEXT,
ADD COLUMN     "gift_cbu" TEXT,
ADD COLUMN     "gift_holder" TEXT,
ADD COLUMN     "gift_mailbox" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "gifts" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER,
    "type" "GiftType" NOT NULL DEFAULT 'other',
    "method" "GiftMethod" NOT NULL,
    "url" TEXT,
    "given" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gifts_event_id_idx" ON "gifts"("event_id");

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;



-- Seguridad: igual que las demás tablas, solo se usa a través de la API.
ALTER TABLE "gifts" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "gifts" FROM anon, authenticated;
