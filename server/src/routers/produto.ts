import { t } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const produtoRouter = t.router({
  getAll: t.procedure.query(async () => {
  try {
    const produtos = await prisma.produto.findMany();
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw new Error("Falha ao carregar produtos do banco");
  }
}),
  add: t.procedure
    .input(
      z.object({
        nome: z.string(),
        preco: z.number(),
        descricao: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.produto.create({ data: input });
    }),
  addCompra: t.procedure
  .input(
    z.object({
      produtoId: z.number(),
      status: z.string().default("aFazer"),
    })
  )
  .mutation(async ({ input }) => {
    return prisma.compra.create({
      data: {
        produtoId: input.produtoId,
        status: input.status,
      },
    });
  }),
});
