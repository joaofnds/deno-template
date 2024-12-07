import { assertNotMatch } from "@std/assert";

assertNotMatch(
  Deno.env.get("DENO_ENV") || "",
  /prod/i,
  "test files should not be imported in production",
);
