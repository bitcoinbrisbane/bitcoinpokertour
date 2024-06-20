const express = require("express");
const router = express.Router();

const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

// use json
router.use(express.json());

router.get("/:eventid", async (req, res) => {
	const event_id = req.params.eventid;
	const registrations = await Registration.findById(event_id);

	if (!registrations || registrations.length === 0) {
		const data = [
			{
				name: "Dog",
				email: "dog4@dog.com",
				date: "2024-06-04T05:06:45.793Z",
				event_id: "665e8fcc4666b3aebb756774",
				_id: "665ea0e5f5r1050635906e2e",
				__v: 0,
				bitcoin_address: "tb1qugnsszut6dm6ggj8ut45tg83tklfcsqwv4l39q"
			},
			{
				name: "Cat",
				email: "cat4@cat4.com",
				date: "2024-06-03T05:06:45.793Z",
				event_id: "665e8fcc4666b3aebb756774",
				_id: "665ea0e5f5e1050635906e2e",
				__v: 0.1,
				bitcoin_address: "tb1qugnsszut6dm6ggj8ut45tg83tklfcsqwv4l39q"
			}
		];

		return res.json(data);
	}

	return res.json(registrations);
});

router.post("/:eventid", async (req, res) => {
	const event_id = req.params.eventid;
	const { name, email } = req.body;

	const event = await Event.findById(event_id);
	if (!event) {
		return res.status(404).json({ error: "Event not found" });
	}

	// Check to see if registration is closed
	if (event.registration_closed) {
		return res.status(400).json({ error: "Registration is closed" });
	}

	// Check to see if the email is already registered
	const existingRegistration = await Registration.findOne({ email, event_id });

	if (existingRegistration) {
		return res.status(400).json({ error: "Email already registered" });
	}

	const registration = new Registration({
		name,
		email,
		date: new Date(),
		event_id
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
