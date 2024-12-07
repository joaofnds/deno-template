import { HttpService, RequestOptions, Resource } from "./interface.ts";

export class FetchHttpService implements HttpService {
  get(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "GET" });
  }

  head(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "HEAD" });
  }

  post(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "POST" });
  }

  put(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "PUT" });
  }

  delete(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "DELETE" });
  }

  connect(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "CONNECT" });
  }

  options(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "OPTIONS" });
  }

  trace(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "TRACE" });
  }

  patch(url: Resource, options?: RequestOptions): Promise<Response> {
    return fetch(url, { ...options, method: "PATCH" });
  }
}
