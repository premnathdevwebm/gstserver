const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.json({ message: "Working" });
});

Router.get("test/", (req, res) => {
  return res.json({ message: "Working test" });
});

module.exports = Router;
