import { expect } from "@std/expect";
import z from "zod";
import { User } from "../../src/user/user.ts";
import { Driver } from "./driver.ts";

export class UserDriver extends Driver {
  private readonly userSchema = z.object({
    id: z.string(),
    name: z.string(),
  });

  async create(name: string): Promise<User> {
    const response = await this.createReq(name);
    expect(response.status).toEqual(201);

    const body = await response.json();
    return this.parseUser(body);
  }

  createReq(name: string) {
    return this.app.request("/users", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name }),
    });
  }

  async find(id: string): Promise<User> {
    const response = await this.findReq(id);
    expect(response.status).toEqual(200);

    const body = await response.json();
    return this.parseUser(body);
  }

  findReq(id: string) {
    return this.app.request(`/users/${id}`, { method: "GET" });
  }

  async list(): Promise<User[]> {
    const response = await this.app.request("/users", { method: "GET" });
    expect(response.status).toEqual(200);
    const body = await response.json();
    return body.map((u: unknown) => this.parseUser(u));
  }

  private parseUser(body: unknown): User {
    const { id, name } = this.userSchema.parse(body);
    return new User(id, name);
  }
}
