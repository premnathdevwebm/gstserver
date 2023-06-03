const mongoose = require("mongoose");
const Gst = mongoose.model("Gst");

const postGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.create({
      ...req.body,
      user: req.auth.name,
      scn: req.body.scn,
      oio: req.body.oio,
      status: req.body?.status ?? "",
      appealorder: req.body.appealorder,
      predeposit: req.body.predeposit,
      recovery: req.body.recovery,
      appeal: req.body.appeal,
    });
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
    const filter = { status: { $nin: ["14", "13"] } };
    const gsts = await Gst.find(filter);
    res.json(gsts);
  } catch (err) {
    return res.status(404);
  }
};
const getHistory = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gsts",
      });
    }
    const filter = { status: { $in: ["13", "14"] } }
    const gsts = await Gst.find(filter);
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
    const updateQuery = {};
    updateQuery[`status`] = req.body?.status;
    updateQuery[`scn.${req.params.index}`] = { ...req.body.scn };
    updateQuery[`oio.${req.params.index}`] = { ...req.body.oio };
    updateQuery[`appealorder.${req.params.index}`] = {
      ...req.body.appealorder,
    };
    updateQuery[`predeposit.${req.params.index}`] = { ...req.body.predeposit };
    updateQuery[`recovery.${req.params.index}`] = { ...req.body.recovery };
    updateQuery[`appeal.${req.params.index}`] = { ...req.body.appeal };
    const gst = await Gst.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: updateQuery,
      },
      { new: true }
    );
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { postGst, getGsts, getHistory, getGst, updateGst };
