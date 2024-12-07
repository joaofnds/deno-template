import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { HTTPServerModule } from "../../http-server/module.ts";
import { UserModule } from "../module.ts";
import { UserService } from "../user.service.ts";
import { UserController } from "./controller.ts";

export const UserHTTPModule = dx.Module(
  "user-http",
  UserModule,
  HTTPServerModule,
  dx.Provide(
    UserController,
    [UserService],
    (service: UserService) => new UserController(service),
  ),
  dx.Invoke(
    [Hono, UserController],
    (app: Hono, userController: UserController) => userController.register(app),
  ),
);
