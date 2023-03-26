const Router = require("express").Router();

const healtRoutes = require("./health");
const userRoutes = require("./user");

Router.use("/health", healtRoutes);
Router.use("/user", userRoutes);

module.exports = Router;
