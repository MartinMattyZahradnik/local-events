import chai, { expect } from "chai";
import mongoose from "mongoose";

import app from "../../app";
import eventsMock from "../eventsMock";
import Event from "../../models/event";
import { getToken } from "../testUtils";
import usersMock from "../usersMock";
import User from "../../models/user";

describe("GET Users", () => {
  it("GET /user -> should return array of users", async () => {
    const res = await chai.request(app).get("/user");

    expect(res.status).to.equal(200);
    expect(res.body.users.length).to.equal(usersMock.length);
  });

  it("GET /user -> should return limited array of users if limit is applied", async () => {
    const limit = 2;
    const res = await chai.request(app).get(`/user?limit=${limit}`);

    expect(res.status).to.equal(200);
    expect(res.body.users.length).to.equal(limit);
  });
});

describe("GET User", () => {
  it("GET /user/:id -> should return user detail", async () => {
    const id = usersMock[0]._id.toString();
    const res = await chai.request(app).get(`/user/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.user._id).to.equal(id);
  });

  it("GET /user/:id -> should return 404 if user doesn't exist", async () => {
    const id = mongoose.Types.ObjectId().toString();
    const res = await chai.request(app).get(`/user/${id}`);
    expect(res.status).to.equal(404);
  });

  it("GET /user/:id -> should return 400 if :id is invalid ObjectId", async () => {
    const id = "invalidObjectId";
    const res = await chai.request(app).get(`/user/${id}`);
    expect(res.status).to.equal(400);
  });
});

describe("Create User", () => {
  const email = "createdtestuser@localevents.com";
  after(async () => {
    await User.findOneAndDelete({
      email
    });
  });

  it("POST /user -> it should create new user", async () => {
    const res = await chai
      .request(app)
      .post(`/user`)
      .send({
        address: {
          street: "Example street 33",
          postalCode: "000003",
          city: "Berlin",
          countryCode: "DE",
          country: "Germany"
        },
        userRole: "user",
        firstName: "Martin",
        lastName: "Zahradnik",
        userName: "admin",
        password: "password",
        birthDate: 1575125426068,
        phone: "+42191010101",
        image:
          "/2019-11-30T14:50:38.147Z-Screenshot 2019-11-27 at 11.44.54.png",
        email,
        gender: "female"
      });

    const user = await User.findOne({
      email
    });

    expect(res.status).to.equal(201);
    expect(user.email).to.equal(email);
  });

  it("POST /user -> it should return 400 if user with given email already exist", async () => {
    const res = await chai
      .request(app)
      .post(`/user`)
      .send({
        ...usersMock[0]
      });

    expect(res.status).to.equal(400);
  });
});

describe("Update User", () => {
  it("PUT /user/:id -> it should update user", async () => {
    const id = usersMock[1]._id.toString();
    const updatedFirstName = "Updated User name";
    const res = await chai
      .request(app)
      .put(`/user/${id}`)
      .set("authorization", getToken("user"))
      .send({
        firstName: updatedFirstName
      });

    const user = await User.findOne({ _id: id });

    expect(res.status).to.equal(200);
    expect(user.firstName).to.equal(updatedFirstName);
  });

  it("PUT /user/:id -> it should return 403 for missing credentials", async () => {
    const id = usersMock[0]._id.toString();
    const updatedFirstName = "Updated User name";
    const res = await chai
      .request(app)
      .put(`/user/${id}`)
      .set("authorization", getToken("user")) // set user's 3 token
      .send({
        firstName: updatedFirstName
      });

    expect(res.status).to.equal(403);
  });

  it("PUT /user/:id -> it should return 404 if user not exist", async () => {
    const id = mongoose.Types.ObjectId();
    const updatedFirstName = "Updated User name";
    const res = await chai
      .request(app)
      .put(`/user/${id}`)
      .set("authorization", getToken("user")) // set user's 3 token
      .send({
        firstName: updatedFirstName
      });

    expect(res.status).to.equal(404);
  });

  it("PUT /user/:id -> admin should have permission to update any user", async () => {
    const id = usersMock[1]._id.toString();
    const updatedLastName = "Updated User name";
    const res = await chai
      .request(app)
      .put(`/user/${id}`)
      .set("authorization", getToken("admin"))
      .send({
        lastName: updatedLastName
      });

    const user = await User.findOne({ _id: id });

    expect(res.status).to.equal(200);
    expect(user.lastName).to.equal(updatedLastName);
  });

  it("PUT /user/:id -> should return 400 if :id is invalid ObjectId", async () => {
    const id = "invalidObjectId";
    const res = await chai
      .request(app)
      .put(`/user/${id}`)
      .set("authorization", getToken("admin"));
    expect(res.status).to.equal(400);
  });
});
