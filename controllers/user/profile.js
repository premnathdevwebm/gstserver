const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.profileRead = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private profile",
      });
    } else {
      const user = await User.findById(req.auth._id).lean();
      delete user.salt;
      delete user.hash;
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(404);
  }
};
