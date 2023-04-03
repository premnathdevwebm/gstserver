const Router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");
const gstCtrl = require("../controllers/gst")


let secret = "MY_SECRET";
if (process.env.NODE_ENV === "production") {
  secret = process.env.SECRET;
}

const auth = jwt({
  secret,
  algorithms: ["HS256"],
});

Router.post('/', auth, gstCtrl.postGst);

module.exports = Router;