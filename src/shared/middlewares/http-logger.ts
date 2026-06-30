import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import { logger } from "@/shared/logger/logger";

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.requestId ?? randomUUID(),
});
