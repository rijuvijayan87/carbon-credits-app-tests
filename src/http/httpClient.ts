export type RequestOptions = {
  headers?: Record<string, string>;
  token?: string;
};

export type HttpResponse = {
  statusCode: number;
  body: unknown;
};

export interface HttpClient {
  get(url: string, options?: RequestOptions): Promise<HttpResponse>;
  post(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<HttpResponse>;
}
