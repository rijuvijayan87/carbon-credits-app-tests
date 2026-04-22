import z from "zod";

export const envSchema = z.object({
  APP_URL: z.string(),
  LOG_LEVEL: z.string().default("info"),
  CI: z.coerce.number().optional(),
});
