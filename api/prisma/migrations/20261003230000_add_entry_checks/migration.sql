-- CreateTable
CREATE TABLE "entry_checks" (
    "id" UUID NOT NULL,
    "guest_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entry_checks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entry_checks_guest_id_key" ON "entry_checks"("guest_id");

-- AddForeignKey
ALTER TABLE "entry_checks" ADD CONSTRAINT "entry_checks_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Seguridad: igual que las demás tablas, solo se usa a través de la API.
ALTER TABLE "entry_checks" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "entry_checks" FROM anon, authenticated;
