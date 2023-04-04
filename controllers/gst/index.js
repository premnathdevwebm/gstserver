const mongoose = require("mongoose");
const Gst = mongoose.model("Gst");

const postGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.create({ ...req.body, user: req.auth.name });
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};
const getGsts = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gsts",
      });
    }
    const gsts = await Gst.find();
    res.json(gsts);
  } catch (err) {
    return res.status(404);
  }
};
const getGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.findOne({ _id: req.params.id });
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};
const updateGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { gst: { ...req.body } } },
      { new: true }
    );
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { postGst, getGsts, getGst, updateGst };
