import express from "express";
import healthRoutes from "@/modules/health/health.routes";
import { requestId } from "@/shared/middlewares/request-id";
import { errorHandler } from "@/shared/middlewares/error-handler";
import { httpLogger } from "@/shared/middlewares/http-logger";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(requestId);
  app.use(httpLogger);

  app.use(express.json());

  app.use("/health", healthRoutes);

  app.use(errorHandler);

  return app;
}
