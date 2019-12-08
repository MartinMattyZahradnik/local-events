import Event from "../models/event";
import mongoose from "mongoose";

after(async () => {
  await Event.deleteMany({});
  await mongoose.connection.close();
});
