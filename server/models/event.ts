import mongoose, { Schema } from "mongoose";

//  id: string;
//   name: string;
//   description: string;
//   location: string;
//   date: number;
//   imageUrl: string;
//   images: string[];
//   category: string;
//   attendants: string[];
//   similiarEvents?: string[];
//   city: string;
//   tags: string[];
//   map: string;
//   socialLinks: {
//     facebook?: string;
//     twitter?: string;
//     pinterest?: string;
//   };

const eventsCategory = ["fun", "party", "family", "outdoor", "art"];

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
    location: {
      type: String,
      required: true
    },
    date: { type: Number, default: Date.now },
    imageUrl: {
      type: String
    },
    category: {
      type: String,
      enum: eventsCategory,
      required: true
    },
    similiarEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    city: {
      type: String
    },
    tags: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
