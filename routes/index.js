const Router = require("express").Router();

const healtRoutes = require("./health");
const userRoutes = require("./user");
const commisonerRoutes = require("./commioner");
const gstRoutes = require("./gst");

Router.use("/health", healtRoutes);
Router.use("/user", userRoutes);
Router.use("/commisoner", commisonerRoutes);
Router.use("/gst", gstRoutes);

module.exports = Router;
