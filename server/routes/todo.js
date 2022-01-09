const { Router } = require("express");
const { addTodo, getTodos, getTodoById } = require("../controllers/todo");

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.get("/:noteId", getTodoById);

module.exports = router;
