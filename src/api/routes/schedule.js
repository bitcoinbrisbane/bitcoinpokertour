const express = require("express");
const router = express.Router();

const axios = require("axios");

// use json
router.use(express.json());

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const Result = require("../schemas/result");

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const event = await Event.findOne({ _id: id });

  if (!event) {
    return res.sendStatus(404);
  }

  res.json(event);
});

router.get("/:id/results", async (req, res) => {
  const { id } = req.params;

  const results = await Result.find({ event_id: id });

  if (results.length === 0) {
    return res.sendStatus(404);
  }

  res.json(results);
});

router.get("/:id/stats", async (req, res) => {
  const { id } = req.params;

  const response = {
    registrations: 0,
    prize_pool: 0,
    prize_pool_usd: 0,
  };

  const registrations = await Registration.find({ event_id: id });

  response.registrations = registrations.length;
  response.prize_pool = registrations.reduce(
    (total, registration) => total + registration.buy_in,
    0
  );

  const btcPrice = await axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
  );

  response.prize_pool_usd = response.prize_pool * btcPrice.data.bpi.USD.rate_float;

  res.json(response);
});

router.post("/", async (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const {
    title,
    description,
    date,
    location,
    start_stack,
    blind_levels,
    game_type,
    buy_in,
  } = req.body;

  const event = new Event({
    title,
    description,
    date,
    location,
    start_stack,
    blind_levels,
    game_type,
    buy_in,
    start_stack,
    blind_levels,
  });

  await event.save();

  return res.status(201).json(event);
});

router.patch("/:id", async (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const event = await Event.findOne({ _id: id });

  if (!event) {
    return res.sendStatus(404);
  }

  const {
    title,
    description,
    date,
    location,
    start_stack,
    blind_levels,
    game_type,
    buy_in,
    fee,
    registration_close
  } = req.body;

  event.title = title;
  event.description = description;
  event.date = date;
  event.location = location;
  event.start_stack = start_stack;
  event.blind_levels = blind_levels;
  event.game_type = game_type;
  event.buy_in = buy_in;
  event.fee = fee;
  event.registration_close = registration_close;

  await event.save();

  return res.status(201).json(event);
});

module.exports = router;
