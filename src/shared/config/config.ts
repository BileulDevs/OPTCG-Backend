import * as z from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).optional(),
  CORS_ORIGINS: z
    .string()
    .default("")
    .transform((val) =>
      val
        .split(",")
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0),
    ),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid config :\n");
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

export const config = Object.freeze({
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  isProduction: parsed.data.NODE_ENV === "production",
  isDevelopment: parsed.data.NODE_ENV === "development",
  isTest: parsed.data.NODE_ENV === "test",
  logLevel: parsed.data.LOG_LEVEL ?? (parsed.data.NODE_ENV === "development" ? "debug" : "info"),
  corsOrigins: parsed.data.CORS_ORIGINS,
});

export type Config = typeof config;
