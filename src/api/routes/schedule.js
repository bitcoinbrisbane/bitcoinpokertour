const express = require("express");
const router = express.Router();

// use json
router.use(express.json());

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

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

// router.post("/register/:eventid", async (req, res) => {
//   const event_id = req.params.eventid;
//   const { name, email } = req.body;

//   // Check to see if the email is already registered
//   const existingRegistration = await Registration.findOne({ email, event_id });

//   if (existingRegistration) {
//     return res.status(400).json({ error: "Email already registered" });
//   }

//   const registration = new Registration({
//     name,
//     email,
//     date: new Date(),
//     event_id,
//   });

//   await registration.save();

//   registration.bitcoin_address = getRegistrationAddress(
//     event_id,
//     registration._id
//   );

//   await registration.save();

//   return res.json(registration);
// });

module.exports = router;
