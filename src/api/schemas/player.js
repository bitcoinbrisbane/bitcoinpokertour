const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bitcoin_address: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
