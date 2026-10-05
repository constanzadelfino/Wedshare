-- Cada parte del casamiento pasa a tener un tipo (festejo, ceremonia o civil) en lugar de
-- un nombre libre, y hay como máximo una de cada tipo por casamiento.

-- CreateEnum
CREATE TYPE "EventItemKind" AS ENUM ('party', 'ceremony', 'civil');

-- El tipo se toma del nombre que tenían. Las que no son ninguno de los tres se borran.
ALTER TABLE "event_items" ADD COLUMN "kind" "EventItemKind";
UPDATE "event_items" SET "kind" = CASE lower(trim("name"))
  WHEN 'festejo' THEN 'party'::"EventItemKind"
  WHEN 'ceremonia' THEN 'ceremony'::"EventItemKind"
  WHEN 'civil' THEN 'civil'::"EventItemKind"
END;
DELETE FROM "event_items" WHERE "kind" IS NULL;
-- Si había dos del mismo tipo, queda la primera que se cargó.
DELETE FROM "event_items" a USING "event_items" b
  WHERE a."event_id" = b."event_id" AND a."kind" = b."kind" AND a."created_at" > b."created_at";

ALTER TABLE "event_items" ALTER COLUMN "kind" SET NOT NULL;
ALTER TABLE "event_items" DROP COLUMN "name";

-- DropIndex
DROP INDEX "event_items_event_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "event_items_event_id_kind_key" ON "event_items"("event_id", "kind");
