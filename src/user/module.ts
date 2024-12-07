import { dx } from "@pkgs/dx";
import { RandomModule } from "../random/module.ts";
import { RandomService } from "../random/service.ts";
import { UserEventModule } from "./events/module.ts";
import { UserEmitter } from "./events/user-emitter.ts";
import { MikroUserRepository } from "./persistence/mikro.repository.ts";
import { UserPersistenceModule } from "./persistence/module.ts";
import { UserQueueModule } from "./queue/module.ts";
import { UserService } from "./user.service.ts";
import { UserWorkerModule } from "./worker/module.ts";

export const UserModule = dx.Module(
  "user",
  RandomModule,
  UserEventModule,
  UserPersistenceModule,
  UserQueueModule,
  UserWorkerModule,
  dx.Provide(
    UserService,
    [MikroUserRepository, UserEmitter, RandomService],
    (
      userRepository: MikroUserRepository,
      userEmitter: UserEmitter,
      random: RandomService,
    ) => new UserService(userRepository, userEmitter, random),
  ),
);
