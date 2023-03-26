const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.json({ message: `App Working` });
});


module.exports = Router;
