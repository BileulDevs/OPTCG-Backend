import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/errors/AppError";

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
    });
  } else {
    console.error(err);
    res.status(500).json({
      message: "An internal error has occured",
      code: "INTERNAL_ERROR",
    });
  }
};
