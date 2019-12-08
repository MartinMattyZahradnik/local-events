import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import Event from "../models/event";

chai.use(chaiHttp);
chai.should();

before(async () => {
  const eventId = mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

  await Event.create({
    price: { price: 123, currency: "EUR", locale: "en" },
    address: {
      street: "Radlinskeho, 23",
      postalCode: "81107",
      city: "Bratislava",
      countryCode: "AM",
      country: "Armenia"
    },
    category: ["sport", "food"],
    coordinates: [48.1526288, 17.1159969, 17],
    similarEvents: [],
    tags: ["21321", "122"],
    _id: eventId,
    name: "Testing Event",
    description: "This event exist only in testing DB",
    date: 1575482732012,
    imageUrl: "",
    owner: "5d700df7dd776d0a9d0c0e17",
    createdAt: "2019-12-04T18:05:51.523Z",
    updatedAt: "2019-12-04T18:05:51.523Z",
    __v: 0
  });
});
