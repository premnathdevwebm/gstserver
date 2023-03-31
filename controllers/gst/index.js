const mongoose = require("mongoose");
const Gst = mongoose.model("Gst");

const postGst = async (req, res) => {
  try {
    res.json({});
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { postGst };
