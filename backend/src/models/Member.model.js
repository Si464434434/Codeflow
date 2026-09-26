const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
      enum: [
        "Web Development",
        "Mobile Development",
        "AI / Machine Learning",
        "DevOps & Cloud",
        "Open Source",
        "UI/UX Design",
        "Competitive Programming",
        "Blockchain & Web3",
        "Cybersecurity",
        "Just exploring",
      ],
    },
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Message too long"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    welcomeEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
