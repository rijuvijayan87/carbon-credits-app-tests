import { ZodError } from "zod";
import { GotConfiguration } from "./http/gotConfiguration";
import type { HttpClient, RequestOptions } from "./http/httpClient";
import { CategorySchema, type Category } from "./models/category";
export type { Category, Promotion } from "./models/category";

const gotHttpClient = new GotConfiguration();

export type CategoryResponse = {
  statusCode: number;
  category: Category;
};

function parseCategory(body: unknown): Category {
  try {
    return CategorySchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Category response failed validation: ${error.message}`, {
        cause: error,
      });
    }
    throw error;
  }
}

export async function fetchCategory(
  url: string,
  httpClient: HttpClient = gotHttpClient,
  requestOption?: RequestOptions
): Promise<CategoryResponse> {
  const { statusCode, body } = await httpClient.get(url, requestOption);
  const category = parseCategory(body);
  return { statusCode, category };
}
