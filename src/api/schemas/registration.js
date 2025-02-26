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
  btcpay_invoice_id: {
    type: String,
    required: false,
  },
  btcpay_status: {
    type: String,
    enum: ['New', 'Processing', 'Expired', 'Invalid', 'Settled', 'Complete'],
    default: 'New',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
  payment_method: {
    type: String,
    default: 'BTC',
  },
  paid_date: {
    type: Date,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
