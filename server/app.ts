import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Request } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import multer from "multer";
import sgMail from "@sendgrid/mail";
import { makeDBConnectionString } from "./utils/utils";

// Routes
import eventRoutes from "./routes/events";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/auth";
import applicationRoutes from "./routes/app";

dotenv.config();
const fileStorage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req: Request, file: Express.Multer.File, callback: any) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
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
app.use(express.static(__dirname + "/uploads"));

app.use("/app", applicationRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  // All remaining requests return the React app, so it can handle routing.
  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

mongoose
  .connect(makeDBConnectionString())
  .then(result => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    if (process.env.NODE_ENV !== "testing") {
      app.listen(process.env.PORT || 8080);
    }
  })
  .catch(err => console.log(err));

export default app;
