const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.register = (req, res)=> {
    return res.json({"message": "work in progress"})
}

module.exports.login = (req, res)=> {
    return res.json({"message": "work in progress"})
}