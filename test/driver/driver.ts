import { Hono } from "hono";

export class Driver {
  constructor(protected readonly app: Hono) {}
}
