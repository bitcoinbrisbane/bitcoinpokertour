const express = require("express");
const router = express.Router();

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

const axios = require("axios");

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

	let registration = new Registration({
		name,
		email,
		bitcoin_address,
		date: new Date(),
		event_id: eventid
	});

	registration = await registration.save();

	// get count of registrations for this event
	const count = await Registration.find({ event_id: eventid }).countDocuments();

	if (process.env.BTC_PAY_SERVER) {

		// const basic_auth = Buffer.from(`admin@bitcoinpokertour.com:${process.env.BTC_PAY_SERVER_PASS}`).toString("base64");
		const basic_auth = Buffer.from(`admin@bitcoinpokertour.com:duftu5-summok-xehgaC`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Basic ${basic_auth}`
			}
		};

		const amount = event.buy_in + event.fee;

		const invoice = {
			orderId: registration.id,
			itemCode: event.title,
			itemDesc: event.description,
			orderUrl: `https://www.bitcoinpokertour.com/schedule/${event.id}`,
			amount,
			currency: "BTC"
		};

		const response = await axios.post(`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices`, invoice, config);

		registration.third_party_id = response.data.id;
		// registration.buy_in_address = response.data.address;

		await registration.save();
	} else {
		registration.buy_in_address = getRegistrationAddress(
			0, // event_id,
			count
		);
	}

	await registration.save();

	// track address in btc pay server / explorer
	if (!process.env.BTC_PAY_SERVER) {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		await axios.post(`https://explorer.bitcoinpokertour.com/v1/cryptos/btc/addresses/${registration.buy_in_address}`, config);
	}

	return res.status(201).json(registration);
});

router.post("/:eventid/results", async (req, res) => {
	const { eventid } = req.params;
	console.log("eventid", eventid);
});

module.exports = router;
