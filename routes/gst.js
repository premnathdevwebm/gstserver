const Router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");
const gstCtrl = require("../controllers/gst")


let secret = "MY_SECRET";
if (process.env.NODE_ENV === "production") {
  secret = process.env.SECRET ?? "MY_SECRET";
}

const auth = jwt({
  secret,
  algorithms: ["HS256"],
});

Router.post('/', auth, gstCtrl.postGst);
Router.get('/', auth, gstCtrl.getGsts);
Router.get('/excel/:id', auth, gstCtrl.excelgst);
Router.get('/history', auth, gstCtrl.getHistory);
Router.get('/:id', auth, gstCtrl.getGst);
Router.patch('/:id/:index', auth, gstCtrl.updateGst);

module.exports = Router;