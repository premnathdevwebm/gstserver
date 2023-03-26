const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.json({ message: "Working" });
});

module.exports = Router;
