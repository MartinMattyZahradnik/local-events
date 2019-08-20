import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Routes
import eventRoutes from "./routes/evets";

const app = express();
app.use(bodyParser.json());

app.use("/events", eventRoutes);

mongoose
  .connect(
    // "mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/messages?retryWrites=true"
    "mongodb+srv://matty:DJZU4FfVwxrDqdUG@cluster0-dgbbx.mongodb.net/local-events?retryWrites=true"
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
