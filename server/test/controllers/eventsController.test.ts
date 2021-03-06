import chai, { expect } from "chai";
import mongoose from "mongoose";

import app from "../../app";
import eventsMock from "../eventsMock";
import Event from "../../models/event";
import { getToken } from "../testUtils";
import usersMock from "../usersMock";

describe("Event detail", () => {
  it("GET /:eventId -> should return event detail", async () => {
    const eventDetail = await chai
      .request(app)
      .get(`/events/${eventsMock[0]._id}`);

    expect(eventDetail.status).to.equal(200);
    expect(eventDetail.body.event.description).to.equal(
      eventsMock[0].description
    );
  });

  it("GET /:eventId -> should return 404 if event does not exist", async () => {
    const eventDetail = await chai
      .request(app)
      .get(`/events/${mongoose.Types.ObjectId()}`);
    expect(eventDetail.status).to.equal(404);
  });

  it("GET /:eventId -> should return 404 if ObjectId is messed up", async () => {
    const eventDetail = await chai.request(app).get(`/events/notAValidId`);
    expect(eventDetail.status).to.equal(404);
  });
});

describe("Get Events", () => {
  it("GET /events -> should return array of events", async () => {
    const res = await chai.request(app).get(`/events`);
    const { events } = res.body;
    expect(res.status).to.equal(200);
    expect(events).to.be.an("array");
    expect(events.length).to.equal(eventsMock.length);
  });

  it("GET /events -> should return totalItems property", async () => {
    const res = await chai.request(app).get(`/events`);
    expect(res.body.totalItems).to.equal(eventsMock.length);
  });

  it("GET /events -> should populate owner correctly", async () => {
    const res = await chai.request(app).get(`/events?offset=0&limit=10`);
    const { events } = res.body;
    expect(events[0]).to.have.property("owner");
    expect(events[0].owner).to.have.property("email");
    expect(events[0].owner.email).to.equal("admin@localevents.com");
  });

  it("GET /events -> should paginate correctly", async () => {
    const limit = 2;
    const offset = 3;
    const res = await chai
      .request(app)
      .get(`/events?offset=${offset}&limit=${limit}`);
    const { events } = res.body;
    expect(events.length).to.equal(limit);
    expect(events[0]._id).to.equal(eventsMock[offset]._id.toHexString());
  });
});

describe("Create Events", () => {
  const _id = mongoose.Types.ObjectId();
  after(async () => {
    await Event.deleteOne({ _id });
  });

  it("POST /events -> create Event properly", async () => {
    await chai
      .request(app)
      .post("/events")
      .set("authorization", getToken("user"))
      .send({
        price: { price: 123, currency: "EUR", locale: "en" },
        address: {
          street: "Example street",
          postalCode: "81107",
          city: "Bratislava",
          countryCode: "AM",
          country: "Slovakia"
        },
        category: ["sport", "food"],
        coordinates: [48.1526288, 17.1159969, 17],
        similarEvents: [],
        tags: ["21321", "122"],
        _id,
        name: "Testing Event",
        description: "This event exist only in testing DB",
        date: 1575482732012,
        imageUrl: "",
        owner: mongoose.Types.ObjectId("5defe80a4eb7888d723270e2"),
        createdAt: "2019-12-04T18:05:51.523Z",
        updatedAt: "2019-12-04T18:05:51.523Z",
        __v: 0
      });

    const event = await Event.findById(_id.toString());
    expect(event._id.toString()).to.equal(_id.toString());
  });

  it("POST /events -> should handle missing access_token properly", async () => {
    const res = await chai
      .request(app)
      .post("/events")
      .send({
        price: { price: 123, currency: "EUR", locale: "en" },
        address: {
          street: "Example street",
          postalCode: "81107",
          city: "Bratislava",
          countryCode: "AM",
          country: "Slovakia"
        },
        category: ["sport", "food"],
        coordinates: [48.1526288, 17.1159969, 17],
        similarEvents: [],
        tags: ["21321", "122"],
        _id: mongoose.Types.ObjectId(),
        name: 12, // ERROR - NAME SHOULD BE A STRING!
        description: "This event exist only in testing DB",
        date: 1575482732012,
        imageUrl: "",
        owner: mongoose.Types.ObjectId("5defe80a4eb7888d723270e2"),
        createdAt: "2019-12-04T18:05:51.523Z",
        updatedAt: "2019-12-04T18:05:51.523Z",
        __v: 0
      });

    expect(res.status).to.equal(403);
    expect(res.text).to.equal("Missing Authorization header");
  });
});

describe("Update Events", () => {
  it("UPDATE /events/:id -> should return 403 if has no rights to update event", async () => {
    const id = eventsMock[0]._id.toString(); // Event created by admin
    const res = await chai
      .request(app)
      .put(`/events/${id}`)
      .set("authorization", getToken("user"));
    expect(res.status).to.equal(403);
    expect(res.body).to.eql({
      message: "You don't have access rights to update this event"
    });
  });

  it("UPDATE /events/:id -> admin should be able to update any event", async () => {
    const id = "5defe6519ea3d18c03f5df57";
    const res = await chai
      .request(app)
      .put(`/events/${id}`)
      .set("authorization", getToken("admin"))
      .send({ name: "Updated event name" });

    expect(res.status).to.equal(200);

    const event = await Event.findById(id);

    expect(event.name).to.equals("Updated event name");
  });

  it("UPDATE /events/:id -> user should be able to update own event event", async () => {
    const id = "5defe6519ea3d18c03f5df57";
    const res = await chai
      .request(app)
      .put(`/events/${id}`)
      .set("authorization", getToken("user"))
      .send({ name: "User updated his own event" });

    expect(res.status).to.equal(200);

    const event = await Event.findById(id);
    expect(event.name).to.equals("User updated his own event");
  });

  it("UPDATE /events/:id -> should return 404 if event doesn't exist", async () => {
    const id = mongoose.Types.ObjectId();
    const res = await chai
      .request(app)
      .put(`/events/${id}`)
      .set("authorization", getToken("user"))
      .send({ name: "Event doesn't exist" });

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal(`Unable to find event with id: ${id}`);
  });
});

describe("Delete Events", () => {
  it("DELETE /events -> delete event existing event", async () => {
    const id = eventsMock[eventsMock.length - 1]._id.toString();
    const res = await chai
      .request(app)
      .delete(`/events/${id}`)
      .set("authorization", getToken("user"));
    expect(res.status).to.equal(200);
  });

  it("DELETE /events -> admin should be able to delete any event", async () => {
    // 5defea09ed3c7c4be1de88bb - owner is user
    const res = await chai
      .request(app)
      .delete(`/events/5defea09ed3c7c4be1de88bb`)
      .set("authorization", getToken("admin"));
    expect(res.status).to.equal(200);
  });

  it("DELETE /events -> should return 404 for non existing event", async () => {
    const id = mongoose.Types.ObjectId().toString();
    const res = await chai
      .request(app)
      .delete(`/events/${id}`)
      .set("authorization", getToken("user"));
    expect(res.status).to.equal(404);
  });

  it("DELETE /events -> should return 403 if has no rights to delete event", async () => {
    const _id = mongoose.Types.ObjectId().toString();

    await chai
      .request(app)
      .post("/events")
      .set("authorization", getToken("admin"))
      .send({
        price: { price: 123, currency: "EUR", locale: "en" },
        address: {
          street: "Example street",
          postalCode: "81107",
          city: "Bratislava",
          countryCode: "AM",
          country: "Slovakia"
        },
        category: ["sport", "food"],
        coordinates: [48.1526288, 17.1159969, 17],
        similarEvents: [],
        tags: ["21321", "122"],
        _id,
        name: "Testing Event",
        description: "This event exist only in testing DB",
        date: 1575482732012,
        imageUrl: "",
        owner: usersMock[0]._id,
        createdAt: "2019-12-04T18:05:51.523Z",
        updatedAt: "2019-12-04T18:05:51.523Z",
        __v: 0
      });

    const res = await chai
      .request(app)
      .delete(`/events/${_id}`)
      .set("authorization", getToken("user"));

    expect(res.status).to.equal(403);
  });
});
