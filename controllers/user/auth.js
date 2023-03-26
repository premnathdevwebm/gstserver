const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.register = async (req, res) => {
  try {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    const savedData = await user.save();
    if (savedData) {
      const token = user.generateJwt();
      return res.status(201).json({
        token: token,
      });
    } else {
      throw new Error("Error in Registration");
    }
  } catch (err) {
    return (res.status = 400);
  }
};

module.exports.login = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        message: "All fields required",
      });
      return;
    }
    passport.authenticate("local", (err, user, info) => {
      let token;

      // If Passport throws/catches an error
      if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      // If a user is found
      if (user) {
        token = user.generateJwt();
        return res.status(200).json({
          token: token,
        });
      } else {
        // If user is not found
        return res.status(401).json(info);
      }
    })(req, res);
  } catch (err) {
    console.log(err);
  }
};
