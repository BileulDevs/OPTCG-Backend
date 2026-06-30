import pino from "pino";
import { config } from "@/shared/config/config";

export const logger = pino({
  level: config.logLevel,
  redact: {
    paths: [
      "password",
      "*.password",
      "req.body.password",
      "req.headers.authorization",
      "req.headers.cookie",
    ],
    censor: "[Redacted]",
  },
  transport: config.isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});
