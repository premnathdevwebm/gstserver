const Router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");

const ctrlProfile = require('../controllers/user/profile');
const ctrlAuth = require('../controllers/user/auth');
const { grantAccess } = require("../roles")

let secret = "MY_SECRET";
if (process.env.NODE_ENV === "production") {
  secret = process.env.SECRET ?? "MY_SECRET";
}

const auth = jwt({
  secret,
  algorithms: ["HS256"],
});

// profile
Router.get('/profile', auth, grantAccess('readOwn', 'profile'), ctrlProfile.profileRead);
// authentication
Router.post('/register', ctrlAuth.register);
Router.post('/login', ctrlAuth.login);

module.exports = Router;
