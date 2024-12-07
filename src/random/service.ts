export class RandomService {
  uuid() {
    return crypto.randomUUID();
  }
}
