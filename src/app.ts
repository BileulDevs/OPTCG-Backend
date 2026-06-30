import helmet from "helmet";
import express from "express";
import compression from "compression";
import healthRoutes from "@/modules/health/health.routes";
import { requestId } from "@/shared/middlewares/request-id";
import { errorHandler } from "@/shared/middlewares/error-handler";
import { httpLogger } from "@/shared/middlewares/http-logger";
import { corsConfig } from "@/shared/middlewares/cors";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());

  app.use(corsConfig);

  app.use(compression());

  app.use(requestId);
  app.use(httpLogger);

  app.use(express.json({ limit: "10kb" }));

  app.use("/health", healthRoutes);

  app.use(errorHandler);

  return app;
}
