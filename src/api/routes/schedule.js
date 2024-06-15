const express = require("express");
const router = express.Router();

// use json
router.use(express.json());

const Event = require("../schemas/event");
const Result = require("../schemas/result");

router.get("/", async (req, res) => {
  const events = await Event.find();

  if (events.length === 0) {
    const events = [
      {
        id: 1,
        title: "The 'Mainnet' Test Event",
        description:
          "This is the first event of the Bitcoin Poker tour.  Real Bitcoin is used for this event.",
        date: "2025-01-01 11:00:00",
        location: "Eatons Hill, Brisbane",
        start_stack: 20000,
        blind_levels: 20,
        game_type: "No Limit Texas Holdem",
      },
    ];

    return res.json(events);
  }

  res.json(events);
});

router.get("/:id/results", async (req, res) => {
  const { id } = req.params;

  const results = await Result.find({ event_id: id });

  if (results.length === 0) {
    return res.sendStatus(404);
  }

  res.json(results);
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

module.exports = router;
