const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signup = (req, res) => {
  // TODO
  res.send(req.params);
};

exports.signin = (req, res) => {
  // TODO
  res.send(req.params);
};

exports.signout = (req, res) => {
  // TODO
  res.send(req.params);
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
