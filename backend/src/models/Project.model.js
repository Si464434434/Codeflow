const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description too long"],
    },
    tech: {
      type: [String],
      default: [],
    },
    gradient: {
      type: String,
      default: "from-indigo-600 via-purple-600 to-pink-600",
    },
    github: {
      type: String,
      default: null,
    },
    demo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Live", "Beta", "Active", "Archived"],
      default: "Active",
    },
    contributors: {
      type: Number,
      default: 1,
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
