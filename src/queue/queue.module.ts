import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { HTTPServerModule } from "../http-server/module.ts";
import { BullBoardController } from "./bull-board.controller.ts";

export const QueueModule = dx.Module(
  "queue",
  HTTPServerModule,
  dx.Provide(BullBoardController, () => new BullBoardController()),
  dx.Invoke(
    [Hono, BullBoardController],
    (app: Hono, bullBoardController: BullBoardController) =>
      bullBoardController.register(app),
  ),
);
