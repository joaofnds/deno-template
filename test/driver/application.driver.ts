import { DxApp } from "@pkgs/dx";
import { Hono } from "hono";
import { Driver } from "./driver.ts";
import { PokeAPIDriver } from "./pokeapi.driver.ts";
import { UserDriver } from "./user.driver.ts";

export class ApplicationDriver extends Driver {
  static for(app: DxApp) {
    return new ApplicationDriver(app.get(Hono));
  }

  health() {
    return this.app.request("/health", { method: "GET" });
  }

  get users() {
    return new UserDriver(this.app);
  }

  get pokeapi() {
    return new PokeAPIDriver(this.app);
  }
}
