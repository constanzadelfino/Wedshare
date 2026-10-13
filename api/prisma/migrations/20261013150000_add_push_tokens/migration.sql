-- Celulares de los novios que reciben avisos.

-- CreateTable
CREATE TABLE "push_tokens" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "push_tokens_token_key" ON "push_tokens"("token");

-- CreateIndex
CREATE INDEX "push_tokens_owner_id_idx" ON "push_tokens"("owner_id");


-- Solo se accede por la API.
ALTER TABLE "push_tokens" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "push_tokens" FROM anon, authenticated;
