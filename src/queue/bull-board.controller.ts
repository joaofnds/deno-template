import { createBullBoard } from "@bull-board/api";
import { HonoAdapter } from "@bull-board/hono";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";

export class BullBoardController {
  register(app: Hono) {
    const serverAdapter = new HonoAdapter(serveStatic);
    serverAdapter.setBasePath("/queues");

    createBullBoard({ queues: [], serverAdapter });

    app.route("/queues", serverAdapter.registerPlugin());
  }
}
