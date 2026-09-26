const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    college: {
      type: String,
      trim: true,
      default: "",
    },
    interest: {
      type: String,
      required: [true, "Interest is required"],
    },
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Message too long"],
    },
    type: {
      type: String,
      enum: ["join", "contact"],
      default: "join",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
