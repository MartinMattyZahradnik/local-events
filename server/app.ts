import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

// Routes
import eventRoutes from "./routes/evets";
import userRoutes from "./routes/user";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/events", eventRoutes);
app.use("/user", userRoutes);

interface IErrorHandlerType extends Error {
  statusCode?: number;
  data: any;
}
// Last middleware serve as general Error handler
app.use(
  (
    error: IErrorHandlerType,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  }
);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
