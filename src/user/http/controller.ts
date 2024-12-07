import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { UserService } from "../user.service.ts";

export class UserController {
  constructor(private readonly service: UserService) {}

  register(app: Hono) {
    app.get("/users", async (c) => {
      const users = await this.service.all();
      return c.json(users);
    });

    app.post(
      "/users",
      zValidator(
        "json",
        z.object({ name: z.string().min(3) }),
      ),
      async (c) => {
        const name = c.req.valid("json").name;
        const user = await this.service.create(name);
        return c.json(user, 201);
      },
    );

    app.get(
      "/users/:id",
      zValidator("param", z.object({ id: z.string().uuid() })),
      async (c) => {
        const id = c.req.valid("param").id;
        const user = await this.service.find(id);
        return c.json(user);
      },
    );
  }
}
