import got, { RequestError } from "got";
import type { HttpClient, HttpResponse, RequestOptions } from "./httpClient";
import { logger } from "../util/logger";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export class GotConfiguration implements HttpClient {
  async get(url: string, options?: RequestOptions): Promise<HttpResponse> {
    try {
      logger.debug(`before calling get to the url ${url}`);

      const headers = {
        ...DEFAULT_HEADERS,
        ...options?.headers,
        ...(options?.token && { Authorization: `Bearer ${options.token}` }),
      };

      const response = await got.get(url, { headers, responseType: "json" });
      return { statusCode: response.statusCode, body: response.body };
    } catch (error) {
      if (error instanceof RequestError) {
        logger.error(
          { statusCode: error.response?.statusCode, message: error.message },
          `GET ${url} failed`
        );
      } else {
        logger.error({ error: String(error) }, `GET ${url} unexpected error`);
      }
      throw error;
    }
  }

  async post(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<HttpResponse> {
    try {
      const headers = {
        ...DEFAULT_HEADERS,
        ...options?.headers,
        ...(options?.token && { Authorization: `Bearer ${options.token}` }),
      };

      const response = await got.post(url, {
        json: body,
        headers,
        responseType: "json",
      });
      return { statusCode: response.statusCode, body: response.body };
    } catch (error) {
      if (error instanceof RequestError) {
        logger.error(
          { statusCode: error.response?.statusCode, message: error.message },
          `POST ${url} failed`
        );
      } else {
        logger.error({ error: String(error) }, `POST ${url} unexpected error`);
      }
      throw error;
    }
  }
}
