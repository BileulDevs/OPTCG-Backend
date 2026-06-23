import express from "express";
import healthRoutes from "@/modules/health/health.routes";

export function createApp () {
  const app = express(); 

  app.disable("x-powered-by");

  app.use(express.json());

  app.use("/health", healthRoutes)

  return app;
}