var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Password is wrong",
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
