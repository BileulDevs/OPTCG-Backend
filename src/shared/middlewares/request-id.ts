import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = randomUUID();
  req.requestId = id;
  res.setHeader("X-Request-Id", id);
  next();
};
