import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

const ENVIRONMENTS = ["dev", "stg", "prod"] as const;
type Environment = (typeof ENVIRONMENTS)[number];

const env: Environment = ENVIRONMENTS.includes(
  process.env.TEST_ENV as Environment
)
  ? (process.env.TEST_ENV as Environment)
  : "dev";

dotenv.config({
  path: path.resolve(process.cwd(), `config/.env.${env}`),
  quiet: true,
});

const envSchema = z.object({
  APP_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  parsed.error.issues.forEach((issue) => {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const config = parsed.data;
