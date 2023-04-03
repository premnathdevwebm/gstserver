const mongoose = require("mongoose");
const Gst = mongoose.model("Gst");

const postGst = async (req, res) => {
  try {
    if(!req.auth._id){
      return res.status(401).json({
        message: "UnauthorizedError: private profile",
      });
    }
    const gst = await Gst.create({ ...req.body, user: req.auth.name });
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { postGst };
