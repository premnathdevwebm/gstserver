const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.profileRead = (req, res) => {
  if (!req.payload._id) {
    return res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    User.findById(req.payload._id).exec((err, user) => {
      if (err) {
        return res.status(404);
      }
      return res.status(200).json(user);
    });
  }
};
