import "./bootstrap";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import routes from "./routes";
import "./database";

import { logger } from "./utils/logger";


const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*"
  })
);
app.use(express.json());

app.use(routes);


app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
