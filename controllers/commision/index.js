const mongoose = require("mongoose");
const CommissionRate = mongoose.model("CommissionRate");
const data = require("./dummy.json");

async function addCommisioner() {
  try {
    return await CommissionRate.insertMany(data);
  } catch (err) {
    return err;
  }
}

const getCommisioner = async (req, res) => {
  try {
    const commisioner = await CommissionRate.find();
    return res.json(commisioner[0]);
  } catch (err) {
    return res.status(404);
  }
};
/* 
addCommisioner()
  .then(data=>console.log("data"))
  .catch((err) => console.log(err));
   */

module.exports = { getCommisioner };
