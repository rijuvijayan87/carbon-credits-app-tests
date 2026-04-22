import dotenv from "dotenv";
import path from "node:path";
import { envSchema } from "./envSchema";

const ENVIRONMENTS = ["dev", "stg", "prod"] as const;
type Environment = (typeof ENVIRONMENTS)[number];

const env: Environment = ENVIRONMENTS.includes(
  process.env.TEST_ENV as Environment
)
  ? (process.env.TEST_ENV as Environment)
  : "dev";

// load env from `config` folder
dotenv.config({
  path: path.resolve(process.cwd(), `config/.env.${env}`),
  quiet: true,
});

const parsedEnvs = envSchema.safeParse(process.env);

if (!parsedEnvs.success) {
  console.error("❌ Invalid environment variables:");
  parsedEnvs.error.issues.forEach((issue) => {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const config = parsedEnvs.data;
