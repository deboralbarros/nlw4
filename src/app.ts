import "reflect-metadata";
import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import {router} from "./routes"
import {createConnection} from "typeorm";
import {AppError} from "./errors/AppErrors";


createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({message: err.message});
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  })
})

export {app};