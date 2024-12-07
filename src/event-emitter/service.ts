import { EventEmitter } from "node:events";

export class EventService {
  constructor(private readonly emitter: EventEmitter) {}

  emit(event: string, ...values: unknown[]) {
    return this.emitter.emit(event, ...values);
  }

  on(event: string, listener: (...args: unknown[]) => void) {
    return this.emitter.on(event, listener);
  }
}
