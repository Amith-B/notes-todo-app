const { Router } = require("express");
const { getTodos } = require("../controllers/todo");

const router = Router();

router.get("/:todoId", getTodos);

module.exports = router;
