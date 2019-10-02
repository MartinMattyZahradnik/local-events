import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

dotenv.config();

// Routes
import eventRoutes from "./routes/events";
import userRoutes from "./routes/user";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
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
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dgbbx.mongodb.net/${process.env.DB_NAME}?retryWrites=true`
  )
  .then(result => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
