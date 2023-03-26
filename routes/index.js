const Router = require("express").Router();

const healtRoutes = require("./health");

Router.use("/health", healtRoutes);

module.exports = Router;
