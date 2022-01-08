const { Router } = require("express");
const userRoutes = require("./user");
const todoRoutes = require("./todo");
const notesRoutes = require("./note");

const router = Router();

router.use("/user", userRoutes);
router.use("/todo", todoRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
