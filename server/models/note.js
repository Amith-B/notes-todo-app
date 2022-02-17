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
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", noteSchema);
