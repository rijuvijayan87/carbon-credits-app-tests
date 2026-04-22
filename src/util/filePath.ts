import path from "node:path";
import { fileURLToPath } from "node:url";

export const currentFile = (metaUrl: string) => {
  return path.basename(fileURLToPath(metaUrl));
};
