import { createApp } from "./app";
import "dotenv/config";

const server = createApp();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
