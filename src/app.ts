import express, {Request, Response} from "express";

export function createApp () {
  const app = express(); 

  app.disable("x-powered-by");

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status : "OK"})
  })

  return app;
}