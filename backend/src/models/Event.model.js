const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description too long"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Workshop", "Hackathon", "Community", "Study Circle", "Session", "Meetup", "Outreach"],
    },
    seats: {
      type: Number,
      default: null,
    },
    registered: {
      type: Number,
      default: 0,
    },
    attendees: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["upcoming", "past"],
      default: "upcoming",
    },
    registrationLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
