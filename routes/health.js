const Router = require("express").Router();

Router.get("/test", (req, res) => {
  return res.json({ message: "Working test" });
});
Router.get("/", (req, res) => {
  return res.json({ message: "Working" });
});


module.exports = Router;
