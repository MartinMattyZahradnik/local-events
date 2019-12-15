import chai from "chai";
import chaiHttp from "chai-http";

import Event from "../models/event";
import User from "../models/user";
import eventsMock from "./eventsMock";
import usersMock from "./usersMock";

chai.use(chaiHttp);
chai.should();

before(async () => {
  await User.deleteMany({});
  await Event.deleteMany({});
  await Event.create(eventsMock);
  await User.create(usersMock);
});
