import { CategorySchema, type Category } from "./models/category.js";
import got from "got";

export async function getCategory(url: string): Promise<Category> {
  const response = await got(url).json();
  return CategorySchema.parse(response);
}
