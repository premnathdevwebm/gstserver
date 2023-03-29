const Router = require("express").Router();
const ctrCommisoner = require("../controllers/commision")

Router.get("/", ctrCommisoner.getCommisioner)

module.exports = Router;