import mongoose from "mongoose";

export default [
  {
    address: {
      street: "Example street 1",
      postalCode: "000001",
      city: "Gotham",
      countryCode: "US",
      country: "US"
    },
    userRole: "admin",
    _id: mongoose.Types.ObjectId("5defe7fab64ded7bfafd8dd4"),
    firstName: "Martin",
    lastName: "Zahradnik",
    userName: "admin",
    password: "password",
    birthDate: 1575125426068,
    phone: "+42191010101",
    image: "/2019-11-30T14:50:38.147Z-Screenshot 2019-11-27 at 11.44.54.png",
    email: "admin@localevents.com",
    gender: "male",
    createdAt: "2019-09-04T19:18:15.094Z",
    resetToken: null,
    resetTokenExpiration: null
  },
  {
    address: {
      street: "Example street 2",
      postalCode: "100001",
      city: "New York",
      countryCode: "USA",
      country: "USA"
    },
    userRole: "user",
    _id: mongoose.Types.ObjectId("5defe80a4eb7888d723270e2"),
    firstName: "User First name",
    lastName: "User last name",
    userName: "User user name",
    birthDate: 1575125426068,
    password: "password",
    phone: "+421101010",
    image: "/2019-11-30T14:50:38.147Z-Screenshot 2019-11-27 at 11.44.54.png",
    email: "user@localevents.com",
    gender: "male",
    createdAt: "2019-09-04T19:18:15.094Z",
    resetToken: null,
    resetTokenExpiration: null
  },
  {
    address: {
      street: "Example street",
      postalCode: "100003",
      city: "New York",
      countryCode: "USA",
      country: "USA"
    },
    userRole: "visitor",
    _id: mongoose.Types.ObjectId("5defe81f6097737035b33bc5"),
    firstName: "Visitor First name",
    lastName: "Visitor Last name",
    userName: "Visitor User name",
    birthDate: 1575125426068,
    password: "password",
    phone: "+42123122222",
    image: "/2019-11-30T14:50:38.147Z-Screenshot 2019-11-27 at 11.44.54.png",
    email: "visitor@localevents.com",
    gender: "male",
    createdAt: "2019-09-04T19:18:15.094Z",
    resetToken: null,
    resetTokenExpiration: null
  }
];
