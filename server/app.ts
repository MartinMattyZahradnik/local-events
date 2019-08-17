import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  res.status(200).json({ status: "to be done :)" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
