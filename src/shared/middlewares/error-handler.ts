import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "@/shared/errors/AppError";

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        ...(err instanceof ValidationError && err.details ? { details: err.details } : {}),
      },
    });
  } else {
    req.log.error({ err }, "An internal error has occurred");

    res.status(500).json({
      error: {
        message: "An internal error has occurred",
        code: "INTERNAL_ERROR",
      },
    });
  }
};
