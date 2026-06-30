import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/errors/AppError";
import { config } from "@/shared/config/config";

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  } else {
    console.error({
      requestId: req.requestId,
      error: config.isProduction ? "Internal error" : err,
    });

    res.status(500).json({
      error: {
        message: "An internal error has occured",
        code: "INTERNAL_ERROR",
      },
    });
  }
};
