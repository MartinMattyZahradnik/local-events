import mongoose, { Schema } from "mongoose";

const availableUserRoles = ["admin", "visitor", "user"];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      enum: availableUserRoles,
      required: true,
      default: "user"
    },
    birthDate: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      street: { type: String, required: true },
      postalCode: String,
      city: { type: String, required: true },
      countryCode: String,
      country: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);