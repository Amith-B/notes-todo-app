const { Router } = require("express");
const {
  signup,
  signin,
  signout,
  validateUser,
  validateNewUser,
} = require("../controllers/auth");

const router = Router();

router.post("/signup", validateNewUser, signup);
router.post("/signin", validateUser, signin);
router.get("/signout", signout);

module.exports = router;
