export type Resource = Request | string;
export type RequestOptions = Omit<RequestInit, "method">;

export interface HttpService {
  // RFC 9110
  get(resource: Resource, options?: RequestOptions): Promise<Response>;
  head(resource: Resource, options?: RequestOptions): Promise<Response>;
  post(resource: Resource, options?: RequestOptions): Promise<Response>;
  put(resource: Resource, options?: RequestOptions): Promise<Response>;
  delete(resource: Resource, options?: RequestOptions): Promise<Response>;
  connect(resource: Resource, options?: RequestOptions): Promise<Response>;
  options(resource: Resource, options?: RequestOptions): Promise<Response>;
  trace(resource: Resource, options?: RequestOptions): Promise<Response>;

  // RFC 5789
  patch(resource: Resource, options?: RequestOptions): Promise<Response>;
}
