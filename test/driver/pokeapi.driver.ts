import { Driver } from "./driver.ts";

export class PokeAPIDriver extends Driver {
  getByName(name: string) {
    return this.app.request(`/pokeapi/${name}`, {
      method: "GET",
      headers: new Headers({ "Accept": "application/json" }),
    });
  }
}
