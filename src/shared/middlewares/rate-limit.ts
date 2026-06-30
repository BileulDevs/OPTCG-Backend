import { rateLimit } from "express-rate-limit";
import { TooManyRequestsError } from "@/shared/errors/AppError";

// Store mémoire (défaut) : suffisant en V1 mono-instance.
// À migrer vers rate-limit-redis si passage en multi-instance (scaling horizontal),
// sinon les compteurs seraient incohérents entre instances.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(new TooManyRequestsError("Too many requests, try later", "TOO_MANY_REQUESTS"));
  },
});
