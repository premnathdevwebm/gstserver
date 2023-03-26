const Router = require("express").Router();

Router.get("/test", (req, res) => {
  return res.json({ message: "Working test" });
});
Router.get("/", (req, res) => {
  return res.json({ message: `Working ${process.env.NODE_ENV}` });
});


module.exports = Router;
