-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aFazer',
    "produtoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
