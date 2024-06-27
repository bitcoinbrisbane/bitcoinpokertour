const express = require("express");
const router = express.Router();

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

// use json
router.use(express.json());

router.get("/:eventid", async (req, res) => {
	const { eventid } = req.params;
	console.log("registrations for ", eventid);
	const registrations = await Registration.find({ event_id: eventid.toString() });

	return res.json(registrations);
});

router.post("/:eventid", async (req, res) => {
	const { eventid } = req.params;
	console.log("eventid", eventid);

	const { name, email, bitcoin_address } = req.body;

	const event = await Event.findOne({ _id: eventid });
	if (!event) {
		return res.status(404).json({ error: "Event not found" });
	}

	// Check to see if registration is closed
	if (event.registration_closed) {
		return res.status(400).json({ error: "Registration is closed" });
	}

	// Check to see if the email is already registered
	const existingRegistration = await Registration.findOne({ email: email });

	if (existingRegistration) {
		return res.status(400).json({ error: "Email already registered" });
	}

	const registration = new Registration({
		name,
		email,
		bitcoin_address,
		date: new Date(),
		event_id: eventid
	});

	await registration.save();

	// get count of registrations for this event
	const count = await Registration.find({ event_id: eventid }).countDocuments();

	registration.bitcoin_address = getRegistrationAddress(
		0, // event_id,
		count
	);

	await registration.save();

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	// track anyway
	await axios.post(`https://explorer.bitcoinpokertourn.com/v1/cryptos/btc/addresses/${registration.bitcoin_address}`, config);

	return res.status(201).json(registration);
});

router.post("/:eventid/results", async (req, res) => {
	const { eventid } = req.params;
	console.log("eventid", eventid);
});

module.exports = router;
