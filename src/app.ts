import express from "express";
import healthRoutes from "@/modules/health/health.routes";
import { requestId } from "@/shared/middlewares/request-id";
import { errorHandler } from "@/shared/middlewares/error-handler";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(requestId);

  app.use(express.json());

  app.use("/health", healthRoutes);

  app.use(errorHandler);

  return app;
}
