const mongoose = require("mongoose");

// Add as much to btc pay server as possible
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  buy_in_address: {
    type: String,
    required: false,
  },
  bitcoin_address: {
    type: String,
    required: false,
  },
  tx_id: {
    type: String,
    required: false,
  },
  third_party_id: {
    type: String,
    required: false,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
