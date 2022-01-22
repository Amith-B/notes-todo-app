const { Router } = require("express");
const { getUserById } = require("../controllers/user");

const router = Router();

router.get("/:userId", getUserById);

module.exports = router;
