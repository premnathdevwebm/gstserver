const Router = require("express").Router();

const healtRoutes = require("./health");
const userRoutes = require("./user");
const commisonerRoutes = require("./commioner");

Router.use("/health", healtRoutes);
Router.use("/user", userRoutes);
Router.use("/commisoner", commisonerRoutes);

module.exports = Router;
