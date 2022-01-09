const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    title: { type: String, maxlength: 32, trim: true },
    content: { type: String, maxlength: 1000, trim: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
