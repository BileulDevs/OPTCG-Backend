import { createApp } from "./app";
import { config } from "@/shared/config/config";
import { logger } from "@/shared/logger/logger";

const server = createApp();

server.listen(config.port, () => {
  logger.info({ port: config.port, env: config.nodeEnv }, "Server started");
});
