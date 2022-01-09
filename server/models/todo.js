const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: Strin, maxlength: 32, trim: true },
    content: { type: String, maxlength: 1000, trim: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
