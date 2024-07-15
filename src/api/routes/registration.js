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

	// Create new response and map in the status from btc pay server
	const responses = registrations.map(registration => {
		return {
			...registration._doc,
			status: "Pending",
			btc_received: 0
		};
	});

	if (process.env.BTC_PAY_SERVER) {
		const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${basic_auth}`
			}
		};

		// Do parallel requests to btc pay server
		for (let i = 0; i < responses.length; i++) {
			const registration = responses[i];
			const response = await axios.get(
				`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${registration.third_party_id}`,
				config
			);

			if (response.data.status === "Settled") {
				registration.status = "Complete";
				registration.btc_received = Number(response.data.amount);
				// 	await registration.save();
			}

			if (response.data.status === "Expired") {
				registration.status = "Expired";
			}
		}
	}

	const filtered = responses.filter(registration => registration.status !== "Expired");

	return res.json(filtered);
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
		const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${basic_auth}`
			}
		};

		const response = await axios.get(
			`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${registration.third_party_id}`,
			config
		);

		if (response.data.status === "Settled" || response.data.status === "Pending") {
			return res.status(400).json({ error: "Email already registered" });
		}
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
		const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${basic_auth}`
			}
		};

		const amount = event.buy_in + event.fee;

		const invoice = {
			orderId: registration._id,
			itemCode: event.title,
			itemDesc: event.description,
			orderUrl: `https://www.bitcoinpokertour.com/schedule/${event.id}`,
			amount,
			currency: "BTC",
			checkout: {
				expiryMinutes: 60
			}
		};

		const response = await axios.post(`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices`, invoice, config);
		console.log("response", response.data);

		registration.third_party_id = response.data.id;

		const payment_response = await axios.get(
			`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${response.data.id}/payment-methods`,
			config
		);
		console.log("payment_response", payment_response.data);

		const btc_payment = payment_response.data.find(payment => payment.currency === "BTC");

		if (btc_payment) {
			registration.buy_in_address = btc_payment.destination;
		}

		await registration.save();
	} else {
		registration.buy_in_address = getRegistrationAddress(
			0, // event_id,
			count
		);

		await registration.save();
	}

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
