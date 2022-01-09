const { Router } = require("express");
const { signup, signin, signout } = require("../controllers/auth");

const router = Router();

router.get("/signup", signup);
router.get("/signin", signin);
router.get("/signout", signout);

module.exports = router;
