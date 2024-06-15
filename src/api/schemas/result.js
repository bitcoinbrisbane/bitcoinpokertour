const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  event_id: {
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
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;