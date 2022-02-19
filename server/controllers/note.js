const Notes = require("../models/note");
const { check, validationResult } = require("express-validator");

exports.addNotes = (req, res) => {
  const {
    profile: { _id },
    body: { title, content, color },
  } = req;

  const notesTitle = title ? title : content.slice(0, 32);

  const notes = new Notes({
    user: _id,
    title: notesTitle,
    content,
    color,
  });

  notes.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save notes",
      });
    }
    res.json(data);
  });
};

exports.getNotes = (req, res) => {
  const {
    profile: { _id },
  } = req;

  Notes.find({ user: _id })
    .sort({ updatedAt: -1 })
    .exec((err, notes) => {
      if (err || !notes) {
        return res.status(400).json({
          error: "Not able to get notes list",
        });
      }
      res.json(notes);
    });
};

exports.getNotesById = (req, res) => {
  const {
    params: { noteId },
    profile: { _id },
  } = req;

  Notes.find({ user: _id, _id: noteId }).exec((err, notes) => {
    if (err || !notes) {
      return res.status(400).json({
        error: "Not able to get notes",
      });
    }
    res.json(notes);
  });
};

exports.deleteNotesById = (req, res) => {
  const {
    params: { noteId },
    profile: { _id },
  } = req;

  Notes.findOneAndDelete({ user: _id, _id: noteId }).exec((err, notes) => {
    if (err || !notes) {
      return res.status(400).json({
        error: "Not able to delete notes",
      });
    }
    res.json(notes);
  });
};

exports.updateNotes = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .reduce((prev, data) => ({ ...prev, [data.param]: data.msg }), {}),
    });
  }

  const {
    params: { noteId },
    profile: { _id },
    body: { color, title, content },
  } = req;

  Notes.findOneAndUpdate(
    { user: _id, _id: noteId },
    {
      $set: {
        ...(color && { color }),
        ...(title && { title }),
        ...(content && { content }),
      },
    },
    { new: true }
  ).exec(function (err, notes) {
    if (err || !notes) {
      return res.status(400).json({
        error: "Not able to update notes",
      });
    }
    res.json(notes);
  });
};

exports.getNotesColors = (req, res) => {
  res.json(Notes.schema.path("color").enumValues);
};

exports.validateAddNotes = [
  check("color", "color should be between 0 to 5 and should be integer")
    .isFloat({ min: 0, max: 5 })
    .isInt(),
  check("content", "content is required").trim().isLength({ min: 1 }),
];

exports.validateUpdateNotes = [
  check("color", "color should be between 0 to 5 and should be integer")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .isInt(),
  check("content", "content is required")
    .optional()
    .trim()
    .isLength({ min: 1 }),
];
