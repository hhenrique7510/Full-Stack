import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";


const app = express();
app.use(cors());
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000/trpc");
});
