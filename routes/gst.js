const Router = require("express").Router();
const gstCtrl = require("../controllers/gst")

Router.post('/', gstCtrl.postGst);

module.exports = Router;