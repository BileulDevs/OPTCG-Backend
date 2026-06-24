export interface HealthStatus {
  status: "ok";
  uptime: number;
  timestamp: string;
}

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}
