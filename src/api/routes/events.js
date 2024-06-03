const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();

  if (!events) {
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

module.exports = router;
