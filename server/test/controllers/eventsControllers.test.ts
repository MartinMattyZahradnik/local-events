import chai, { expect } from "chai";
import app from "../../app";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Events Controller", () => {
  it("GET /:eventId -> should return event detail", async () => {
    const eventDetail = await chai
      .request(app)
      .get(`/events/56cb91bdc3464f14678934ca`);

    expect(eventDetail.status).to.equal(200);
    expect(eventDetail.body.event.description).to.equal(
      "This event exist only in testing DB"
    );
  });
});
