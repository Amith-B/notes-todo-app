const User = require("../models/user");

exports.getUserById = (req, res) => {
  const {
    profile: { _id },
    params: { userId },
  } = req;

  if (_id != userId) {
    return res.status(403).send({
      error: "Request forbidden",
    });
  }

  User.findById(_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Unable to parse user info",
      });
    }
    res.json({ name: user.name, email: user.email });
  });
};
