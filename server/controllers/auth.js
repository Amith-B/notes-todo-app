const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .reduce((prev, data) => ({ ...prev, [data.param]: data.msg }), {}),
    });
  }
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.hasOwnProperty("index")
          ? "Email already registered"
          : "NOT able to save user in DB",
      });
    }
    res.json({
      name: data.name,
      email: data.email,
      id: data._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .reduce((prev, data) => ({ ...prev, [data.param]: data.msg }), {}),
    });
  }
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ error: "USER email doesn't exist" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "2 days",
    });
    res.cookie("token", token, {
      expire: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
    });
    const { _id, name, email } = user;
    return res.json({
      token,
      user: { _id, name, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  if (!req.auth) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  User.findById(req.auth._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

const commonUserCheck = [
  check("email", "email is required").isEmail(),
  check(
    "password",
    "password field is required with minimum of 5 characters"
  ).isLength({ min: 5 }),
];

exports.validateNewUser = [
  check("name", "name should be at least 1 char").isLength({ min: 1 }),
  ...commonUserCheck,
];

exports.validateUser = [...commonUserCheck];
