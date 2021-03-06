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
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import sgMail from "@sendgrid/mail";
import { makeDBConnectionString } from "./utils/utils";

// Routes
import eventRoutes from "./routes/events";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/auth";
import applicationRoutes from "./routes/app";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new Error("Only .jpg, .jpeg, .png, .gif files are allowed"),
      false
    );
  }
  callback(null, true);
};

// Init upload
export const fileUpload = multer({
  storage: multerS3({
    s3,
    bucket: "local-events-react",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
    acl: "public-read"
  }),
  fileFilter
});

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
app.use(express.static("./uploads/"));

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
  .connect(makeDBConnectionString(), { useNewUrlParser: true })
  .then(result => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    if (process.env.NODE_ENV !== "testing") {
      app.listen(process.env.PORT || 8080);
    }
  })
  .catch(err => console.log(err));

export default app;
