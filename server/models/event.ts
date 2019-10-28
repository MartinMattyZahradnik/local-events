import mongoose, { Schema } from "mongoose";

const eventsCategory = [
  "music",
  "arts",
  "business",
  "parties",
  "classes",
  "sport",
  "wellness",
  "food and drink",

  "fun",
  "movie",
  "party",
  "family",
  "outdoor",
  "art",
  "nature"
];

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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
        required: true
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

export default mongoose.model("Event", eventSchema);
