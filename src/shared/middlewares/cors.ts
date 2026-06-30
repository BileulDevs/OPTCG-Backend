import cors from "cors";
import { config } from "@/shared/config/config";
import { ForbiddenError } from "@/shared/errors/AppError";

export const corsConfig = cors({
  origin: (origin, callback) => {
    // No origins
    if (!origin) {
      callback(null, true);
      return;
    }

    // Whitelist origins
    if (config.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new ForbiddenError("Not allowed by CORS", "CORS_NOT_ALLOWED"));
  },
  credentials: true,
});
