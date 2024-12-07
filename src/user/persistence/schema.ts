import { EntitySchema } from "@mikro-orm/core";
import { User } from "../user.ts";

export const UserSchema = new EntitySchema({
  class: User,
  tableName: "users",
  properties: {
    id: { type: "uuid", primary: true },
    name: { type: "varchar" },
  },
});
