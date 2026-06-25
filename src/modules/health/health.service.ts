import { config, type Config } from "@/shared/config/config";

export interface HealthStatus {
  status: "ok";
  uptime: number;
  timestamp: string;
  env: Config["nodeEnv"];
}

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
  };
}
