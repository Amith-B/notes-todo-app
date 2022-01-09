const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
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
