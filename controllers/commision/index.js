const mongoose = require("mongoose");
const CommissionRate = mongoose.model("CommissionRate");

const getCommisioner = async (req, res) => {
  try {
     const commisioner = await CommissionRate.find();
     return res.json(commisioner)
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { getCommisioner };
