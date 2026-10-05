-- AlterTable
ALTER TABLE "events" ADD COLUMN     "album_photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "closing_phrase" TEXT,
ADD COLUMN     "story_photo" TEXT,
ADD COLUMN     "story_text" TEXT,
ADD COLUMN     "story_title" TEXT;

