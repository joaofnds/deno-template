import { RandomService } from "../random/service.ts";
import { UserEmitter } from "./events/user-emitter.ts";
import type { UserRepository } from "./user.repository.ts";
import { User } from "./user.ts";

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly emitter: UserEmitter,
    private readonly random: RandomService,
  ) {
    this.emitter.setContext(UserService.name);
  }

  async create(name: string) {
    const user = new User(this.random.uuid(), name);

    await this.repository.persist(user);
    this.emitter.created(user);

    return user;
  }

  find(id: string) {
    return this.repository.find(id);
  }

  all() {
    return this.repository.findAll();
  }
}
