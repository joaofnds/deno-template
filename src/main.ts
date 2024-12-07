import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { AppModule } from "./main.module.ts";

const app = dx.App(AppModule);
await app.start();

const server = Deno.serve({ port: 3000 }, app.get(Hono).fetch);
Deno.addSignalListener("SIGINT", async () => {
  await server.shutdown();
  await app.stop();
  Deno.exit(0);
});
