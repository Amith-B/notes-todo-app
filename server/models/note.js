const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 32, trim: true },
    content: { type: String, maxlength: 1000, trim: true },
    color: {
      type: String,
      trim: true,
      default: "#ffffff",
      enum: ["yellow", "red", "lightblue", "orange", "#ffffff", "black"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", noteSchema);
