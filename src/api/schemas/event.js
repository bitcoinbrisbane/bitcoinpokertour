const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  game_type: {
    type: String,
    required: true,
  },
  buy_in: {
    type: Number,
    required: true,
  },
  start_stack: {
    type: Number,
    required: true,
  },
  blind_levels: {
    type: Number,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
