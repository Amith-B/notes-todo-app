const { Router } = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const todoRoutes = require("./todo");
const notesRoutes = require("./note");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", isSignedIn, isAuthenticated, userRoutes);
router.use("/todo", isSignedIn, isAuthenticated, todoRoutes);
router.use("/notes", isSignedIn, isAuthenticated, notesRoutes);

module.exports = router;
