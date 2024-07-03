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

	const usebtcpayserver = process.env.USE_BTCPAYSERVER === "true";

	if (usebtcpayserver) {
		const url = process.env.BTCPAYSERVER_URL || "https://btcpay.bitcoinpokertour.com/api/v1/stores/Eh4T9hden5aK2E6sFSdA9csszCrVrN9ZySDZB66A4Jra/invoices";

		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Basic ${process.env.BTCPAYSERVER_TOKEN}`
			}
		};

		const data = {
			orderId: registration._id,
			itemCode: eventid,
			itemDesc: `Buy-in to ${event.name} for ${email}`,
			// orderUrl: "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
			receiptData: {
				Title: "Bitcoin Poker Tour",
				Description:
					"Lovely, fresh and tender, Meng Ding Gan Lu ('sweet dew') is grown in the lush Meng Ding Mountains of the southwestern province of Sichuan where it has been cultivated for over a thousand years."
			}
		};

		const response = await axios.post(url, data, config);
		console.log("response", response.data);

		return res.status(201).json(registration);
	}

	// Legacy code
	registration.buy_in_address = getRegistrationAddress(
		0, // event_id,
		count
	);

	await registration.save();

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	// track address in btc pay server / explorer
	await axios.post(`https://explorer.bitcoinpokertour.com/v1/cryptos/btc/addresses/${registration.buy_in_address}`, config);

	return res.status(201).json(registration);
});

router.post("/:eventid/results", async (req, res) => {
	const { eventid } = req.params;
	console.log("eventid", eventid);
});

module.exports = router;
