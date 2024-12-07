import { EntityManager, RequestContext } from "@mikro-orm/core";
import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
// import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
// import { Logger } from "pino";
import { DatabaseModule } from "../database/module.ts";
import { size } from "../lib/size.ts";
import { LoggerModule } from "../logger/module.ts";

export const HTTPServerModule = dx.Module(
  "http server",
  LoggerModule,
  DatabaseModule,
  dx.Provide(Hono, () => new Hono()),
  // dx.InvokeWith(
  //   [Hono, "logger"],
  //   (app: Hono, log: Logger) => app.use(logger(log.info.bind(log))),
  // ),
  dx.Invoke(
    [Hono],
    (app: Hono) => app.use(requestId()),
  ),
  dx.Invoke(
    [Hono],
    (app: Hono) => app.use(bodyLimit({ maxSize: 2 * size.Megabyte })),
  ),
  dx.Invoke(
    [Hono, EntityManager],
    (app: Hono, em: EntityManager) =>
      app.use((_, next) => RequestContext.create(em, next)),
  ),
);
