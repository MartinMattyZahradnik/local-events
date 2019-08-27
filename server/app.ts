import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

// Routes
import eventRoutes from "./routes/evets";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/events", eventRoutes);

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
    // "mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/messages?retryWrites=true"
    "mongodb+srv://matty:DJZU4FfVwxrDqdUG@cluster0-dgbbx.mongodb.net/local-events?retryWrites=true"
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));