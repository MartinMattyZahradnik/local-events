import chai, { expect } from "chai";
import app from "../../app";
import mongoose from "mongoose";

import eventsMock from "../eventsMock";

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
    const req = await chai.request(app).get(`/events`);
    const { events } = req.body;
    expect(req.status).to.equal(200);
    expect(events).to.be.an("array");
    expect(events.length).to.equal(eventsMock.length);
  });

  it("GET /events -> should populate owner correctly", async () => {
    const req = await chai.request(app).get(`/events?offset=0&limit=10`);
    const { events } = req.body;
    expect(events[0]).to.have.property("owner");
    expect(events[0].owner).to.have.property("email");
    expect(events[0].owner.email).to.equal("admin@localevents.com");
  });

  it("GET /events -> should paginate correctly", async () => {
    const limit = 2;
    const offset = 3;
    const req = await chai
      .request(app)
      .get(`/events?offset=${offset}&limit=${limit}`);
    const { events } = req.body;
    expect(events.length).to.equal(limit);
    expect(events[0]._id).to.equal(eventsMock[offset]._id.toHexString());
  });
});
