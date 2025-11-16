import { t } from "./trpc";
import { produtoRouter } from "./routers/produto";

export const appRouter = t.router({
  produto: produtoRouter,
});

export type AppRouter = typeof appRouter;
