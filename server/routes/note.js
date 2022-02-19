const { Router } = require("express");
const {
  addNotes,
  getNotesColors,
  getNotes,
  getNotesById,
  updateNotes,
  validateUpdateNotes,
  validateAddNotes,
  deleteNotesById,
} = require("../controllers/note");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = Router();

router.get("/colors", getNotesColors);
router.get("/", isSignedIn, isAuthenticated, getNotes);
router.post("/", validateAddNotes, isSignedIn, isAuthenticated, addNotes);
router.get("/:noteId", isSignedIn, isAuthenticated, getNotesById);
router.delete("/:noteId", isSignedIn, isAuthenticated, deleteNotesById);
router.patch(
  "/:noteId",
  validateUpdateNotes,
  isSignedIn,
  isAuthenticated,
  updateNotes
);

module.exports = router;
