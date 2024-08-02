const express = require("express");
const router = express.Router();

const axios = require("axios");

// use json
router.use(express.json());

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const Result = require("../schemas/result");

const { getRegistrationCount } = require("../utils");

router.get("/", async (req, res) => {
	const { city } = req.query;

	if (city) {
		const events = await Event.find({
			location: { $regex: new RegExp(city, "i") },
			date: { $gte: new Date() }
		});
		return res.json(events);
	}
	
	// Only show future events
	const events = await Event.find({ date: { $gte: new Date() } });
	res.json(events);
});

router.get("/past", async (req, res) => {
	const { city } = req.query;

	if (city) {
		const events = await Event.find({
			location: { $regex: new RegExp(city, "i") },
			date: { $lte: new Date() }
		});
		return res.json(events);
	}
	
	// Only show future events
	const events = await Event.find({ date: { $lte: new Date() } });
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

router.post("/:id/results", async (req, res) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const { id } = req.params;
	const { data } = req.body;

	const event = await Event.findOne({
		_id: id
	});

	if (!event) {
		return res.sendStatus(404);
	}

	const results = [];
	for (i = 0; i < data.length; i++) {
		const data = data[i];
		const payout = 0.001; // do the algo
		const result = new Result(event._id, data.name, data.place, payout);
		result.save()
		results.push(result);
	}

	await Promise.all(results);

	return res.status(201).json(results);
});

router.get("/:id/stats", async (req, res) => {
	const { id } = req.params;
	console.log(`Stats for event ${id}`);

	const response = {
		entries: 0,
		prize_pool: 0,
		prize_pool_usd: 0
	};

	const registrations = await Registration.find({ event_id: id });
	console.log(`Found ${registrations.length} registrations`);

	if (registrations.length > 0) {
		const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${basic_auth}`
			}
		};

		for (let i = 0; i < registrations.length; i++) {
			const registration = registrations[i];

			const { data } = await axios.get(
				`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${registration.third_party_id}`,
				config
			);

			console.log(`Response for ${registration.third_party_id}: ${data.status}`);

			if (data.status === "Settled") {
				response.entries += 1;
				response.prize_pool += Number(data.amount);
			}
		}
	}

	const btcPriceResult = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
	response.prize_pool_usd = response.prize_pool * btcPriceResult.data.bpi.USD.rate_float;

	res.json(response);
});

router.get("/:id/payouts", async (req, res) => {
	const { id } = req.params;

	const event = await Event.find({ event_id: id });

	if (!event) {
		return res.sendStatus(404);
	}

	const payouts = [];
	const count = await getRegistrationCount(id);

	if (count === 0) {
		return res.json(payouts);
	}

	const prize_pool = count * event.buy_in;

	// Top 2
	if (count < 3) {
		payouts.push({ place: 1, percent: 0.6, amount: prize_pool * 0.6 });
		payouts.push({ place: 2, percent: 0.4, amount: prize_pool * 0.4 });

		return res.json(payouts);
	}

	// Top 3
	if (count <= 10) {
		payouts.push({ place: 1, percent: 0.6, amount: prize_pool * 0.6 });
		payouts.push({ place: 2, percent: 0.3, amount: prize_pool * 0.3 });
		payouts.push({ place: 3, percent: 0.1, amount: prize_pool * 0.1 });

		return res.json(payouts);
	}

	// Top 4
	payouts.push({ place: 1, percent: 0.5, amount: prize_pool * 0.5 });
	payouts.push({ place: 2, percent: 0.3, amount: prize_pool * 0.3 });
	payouts.push({ place: 3, percent: 0.2, amount: prize_pool * 0.2 });
	payouts.push({ place: 3, percent: 0.1, amount: prize_pool * 0.1 });

	return res.json(payouts);
});

router.post("/", async (req, res) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const { title, description, date, location, start_stack, blind_levels, game_type, buy_in, max_players } = req.body;

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
		max_players
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

	const { title, description, date, location, start_stack, blind_levels, game_type, buy_in, fee, registration_close, max_players } = req.body;

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
	event.max_players = max_players;

	await event.save();

	return res.status(201).json(event);
});


// add results to event
router.post("/:eventid/results", async (req, res) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const { eventid } = req.params;
	const results = req.body;

	const event = await Event.findOne({ _id: eventid });

	if (!event) {
		return res.status(404).json({ error: "Event not found" });
	}

	let count = 0;

	for (let i = 0; i < results.length; i++) {
		const _result = results[i];

		const registration = await Registration.findOne({ registration_id: _result.registration_id });

		if (!registration) {
			return res.status(404).json({ error: `Registration ${_result.name} not found` });
		}

		const result = new Result({
			event_id: eventid,
			registration_id: registration._id,
			name: _result.name,
			place: _result.place,
			payout: _result.payout,
			tx_id: _result.tx_id
		});

		await result.save();
		count += 1;
	}

	return res.status(201).json({ message: `${count} results added` });
});

// add results to event
router.patch("/:eventid/results", async (req, res) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const { eventid } = req.params;
	const results = req.body;

	const event = await Event.findOne({ _id: eventid });

	if (!event) {
		return res.status(404).json({ error: "Event not found" });
	}

	let count = 0;

	for (let i = 0; i < results.length; i++) {
		const _result = results[i];

		// Could be primary key
		const result = await Result.findOne({ _id: _result.id });

		if (!result) {
			return res.status(404).json({ error: `Result ${_result.id} not found` });
		}

		if (!result.tx_id) {
			result.tx_id = _result.tx_id;
			await result.save();

			count += 1;
		}
	}

	return res.status(201).json({ message: `${count} results added` });
});

module.exports = router;
