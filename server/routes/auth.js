const { Router } = require("express");
const {
  signup,
  signin,
  signout,
  validateUser,
  validateNewUser,
} = require("../controllers/auth");

const router = Router();

router.get("/signup", validateNewUser, signup);
router.get("/signin", validateUser, signin);
router.get("/signout", signout);

module.exports = router;
