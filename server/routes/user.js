const { Router } = require("express");
const { getUser } = require("../controllers/user");

const router = Router();

router.get("/profile", getUser);

module.exports = router;
