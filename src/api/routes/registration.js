const express = require("express");
const router = express.Router();
const axios = require("axios");

const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

// use json
router.use(express.json());

router.get("/:eventid", async (req, res) => {
  const event_id = req.params.eventid;
  const registrations = await Registration.findById(event_id);

  return res.json(registrations);
});

router.post("/:eventid", async (req, res) => {
  const event_id = req.params.eventid;
  const { name, email } = req.body;

  // Check to see if the email is already registered
  const existingRegistration = await Registration.findOne({ email, event_id });

  if (existingRegistration) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const registration = new Registration({
    name,
    email,
    date: new Date(),
    event_id,
  });

  // Send mail to the user
  await axios.post("https://api.postmarkapp.com/email", {
    
  });


  await registration.save();

  // get count of registrations for this event
  const count = await Registration.find({ event_id }).countDocuments();

  registration.bitcoin_address = getRegistrationAddress(
    0, // event_id,
    count
  );

  await registration.save();

  return res.status(201).json(registration);
});

module.exports = router;
