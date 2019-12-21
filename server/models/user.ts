import mongoose, { Schema } from "mongoose";

export type AvailableUserRoles = "admin" | "visitor" | "user";
type Gender = "male" | "female" | "other";

export interface IUserModel extends mongoose.Document {
  name: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone?: string;
  birthDate: Date;
  userRole: AvailableUserRoles;
  gender: Gender;
  password: String;
  image?: String;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  resetToken: String | null;
  resetTokenExpiration: number | null;
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
    image: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    password: {
      type: String,
      required: true
    },
    resetToken: {
      type: String,
      required: false,
      default: null
    },
    resetTokenExpiration: {
      type: Number,
      required: false,
      default: null
    },
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
