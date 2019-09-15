import mongoose, { Schema } from "mongoose";

type AvailableUserRoles = "admin" | "visitor" | "user";
type Gender = "male" | "female" | "other";

export interface IUserModel extends mongoose.Document {
  name: string;
  firstName: string;
  userName: string;
  email: string;
  phone?: string;
  birthDate: Date;
  userRole: AvailableUserRoles;
  gender: Gender;
  password: String;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

const availableUserRoles = ["admin", "visitor", "user"];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
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
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    address: {
      street: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      countryCode: String,
      country: { type: String, required: true, trim: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
