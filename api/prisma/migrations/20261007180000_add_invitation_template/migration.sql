-- CreateEnum
CREATE TYPE "invitation_template" AS ENUM ('dorado', 'rosa', 'noche', 'minimal');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "template" "invitation_template" NOT NULL DEFAULT 'dorado';

