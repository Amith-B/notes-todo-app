const { Router } = require("express");
const {
  addNotes,
  getNotesColors,
  getNotes,
  getNotesById,
} = require("../controllers/note");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = Router();

router.get("/colors", getNotesColors);
router.get("/", isSignedIn, isAuthenticated, getNotes);
router.post("/", isSignedIn, isAuthenticated, addNotes);
router.get("/:noteId", isSignedIn, isAuthenticated, getNotesById);

module.exports = router;
