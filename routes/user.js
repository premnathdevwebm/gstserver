const Router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");

var ctrlProfile = require('../controllers/user/profile');
var ctrlAuth = require('../controllers/user/auth');

let secret = "MY_SECRET";
if (process.env.NODE_ENV === "production") {
  secret = process.env.SECRET;
}

const auth = jwt({
  secret,
  algorithms: ["HS256"],
  userProperty: "payload",
});

// profile
Router.get('/profile', auth, ctrlProfile.profileRead);
// authentication
Router.post('/register', ctrlAuth.register);
Router.post('/login', ctrlAuth.login);

module.exports = Router;
