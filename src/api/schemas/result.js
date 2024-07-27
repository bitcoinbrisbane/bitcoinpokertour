const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
  },
  registration_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
  payout: {
    type: Number,
    required: true,
  },
  tx_id: {
    type: String,
    required: false,
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;