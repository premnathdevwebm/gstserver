const mongoose = require('mongoose');

const rangeSchema = new mongoose.Schema({
  title: {
    name: String,
  },
  data: [{
  label: String,
  value: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  location: String,
}]
});

const divisionSchema = new mongoose.Schema({
  title: {
    name: String,
  },
  data: [{
    label: String,
    value: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    location: String,
    range: [rangeSchema],
  }],
});

const subCommissionRateSchema = new mongoose.Schema({
  title: {
    name: String,
  },
  data: [{
    label: String,
    value: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    location: String,
    division: [divisionSchema],
    range: [rangeSchema],
  }],
});

const commissionRateSchema = new mongoose.Schema({
  title: {
    name: String,
  },
  data: [{
    label: String,
    value: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    location: String,
    subCommissionRate: [subCommissionRateSchema],
    division: [divisionSchema],
    range: [rangeSchema],
  }],
});

mongoose.model('CommissionRate', commissionRateSchema);