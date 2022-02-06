const Notes = require("../models/note");

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

  Notes.find({ user: _id }).exec((err, notes) => {
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

exports.getNotesColors = (req, res) => {
  res.json(Notes.schema.path("color").enumValues);
};
