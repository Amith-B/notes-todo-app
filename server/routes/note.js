const { Router } = require("express");
const { getNotes } = require("../controllers/note");

const router = Router();

router.get("/:noteId", getNotes);

module.exports = router;
