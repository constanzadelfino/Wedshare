-- AlterTable
ALTER TABLE "events" ADD COLUMN     "preview_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "events_preview_token_key" ON "events"("preview_token");

