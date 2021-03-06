import mongoose, { Schema, Document } from "mongoose";
import { IUserModel } from "./user";

export interface IAddress {
  street: string;
  postalCode: string;
  city: string;
  countryCode?: string;
  country: string;
}

export interface IPrice {
  price: number;
  currency: string;
  locale: string;
}

export interface IEventModel extends Document {
  name: string;
  description: string;
  date: Date;
  imageUrl?: string;
  category: string[];
  coordinates?: [number, number];
  similarEvents?: mongoose.Types.ObjectId[];
  tags?: string[];
  price: IPrice;
  address: IAddress;
  owner: IUserModel["_id"];
  createdAt: number;
  deletedAt: number | null;
}

const eventsCategory = [
  "other",
  "music",
  "art",
  "business",
  "parties",
  "classes",
  "sport",
  "wellness",
  "food",
  "fun",
  "movie",
  "party",
  "family",
  "outdoor",
  "nature"
];

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      index: true
    },
    date: { type: Number, default: Date.now, required: true },
    imageUrl: {
      type: String
    },
    category: {
      type: [String],
      enum: eventsCategory,
      required: true
    },
    coordinates: {
      type: [Number, Number],
      required: false
    },
    similarEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    tags: [
      {
        type: String,
        required: false
      }
    ],
    price: {
      price: {
        type: Number,
        default: 0
      },
      currency: {
        type: String,
        default: "USD"
      },
      locale: {
        type: String,
        default: "en-US"
      }
    },
    address: {
      street: { type: String, required: true },
      postalCode: String,
      city: { type: String, required: true },
      countryCode: String,
      country: { type: String, required: true }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

eventSchema.index(
  {
    name: "text",
    description: "text"
  },
  {
    weights: {
      name: 5,
      description: 1
    }
  }
);

export default mongoose.model<IEventModel>("Event", eventSchema);
