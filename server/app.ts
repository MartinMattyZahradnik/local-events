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
import multer from "multer";

// Routes
import eventRoutes from "./routes/events";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";

dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (req: Request, file, callback) => {
    callback(null, "public/uploads");
  },
  filename: (req: Request, file: Express.Multer.File, callback: any) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).array("image", 10));
app.use(cors());
app.use(express.static("public"));

app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

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
