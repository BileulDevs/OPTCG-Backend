import { createApp } from "./app";
import { config } from "@/shared/config/config";

const server = createApp();

server.listen(config.port, () => {
  console.log(`Server started on http://localhost:${config.port} on ${config.nodeEnv}`);
});
