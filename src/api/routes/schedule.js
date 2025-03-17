const express = require("express");
const router = express.Router();

const axios = require("axios");
const mongoose = require("mongoose");

// use json
router.use(express.json());

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const Result = require("../schemas/result");



/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Get all future events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter events by city
 *     responses:
 *       200:
 *         description: List of future events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 * 
 * /schedule/past:
 *   get:
 *     summary: Get all past events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter events by city
 *     responses:
 *       200:
 *         description: List of past events
 * 
 * /schedule/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 * 
 * /schedule/{id}/results:
 *   get:
 *     summary: Get event results
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event results
 *       404:
 *         description: Results not found
 * 
 * /schedule/{id}/stats:
 *   get:
 *     summary: Get event statistics
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event statistics
 * 
 * /schedule/{id}/payouts:
 *   get:
 *     summary: Get event payouts
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event payout structure
 */

router.get("/test", async (req, res) => {
	console.log("🧪 Test endpoint hit!");
	res.json({ 
		message: "API is working! 🎉",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'development',
		database: mongoose.connection.name || 'Not connected'
	});
});

// Get all events


router.get("/", async (req, res) => {
	try {
		console.log("Getting all events");
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		console.error("Error fetching events:", error);
		res.status(500).json({ 
			error: "Failed to fetch events",
			details: error.message 
		});
	}
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
	console.log("Getting event ", id);

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

	console.log(req.body);

	const event = await Event.findOne({
		_id: id
	});

	if (!event) {
		return res.sendStatus(404);
	}

	const results = [];
	for (i = 0; i < req.body.length; i++) {
		const data = req.body[i];
		const payout = 0.001; // do the algo
		const result = new Result(event._id, data.name, data.place, payout);
		result.save();
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

			try {
				const { data } = await axios.get(
					`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${registration.third_party_id}`,
					config
				);

				console.log(`Response for ${registration.third_party_id}: ${data.status}`);

				if (data.status === "Settled") {
					response.entries += 1;
					response.prize_pool += Number(data.amount);
				}
			} catch (error) {
				console.error(error);
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
	try {
		console.log("Creating event with payload:", JSON.stringify(req.body, null, 2));

		// Validate required fields
		const requiredFields = [
			'title', 
			'description', 
			'date', 
			'location', 
			'start_stack',
			'blind_levels',
			'game_type',
			'buy_in'
		];
		
		const missingFields = requiredFields.filter(field => !req.body[field]);
		if (missingFields.length > 0) {
			return res.status(400).json({ 
				error: "Missing required fields", 
				fields: missingFields 
			});
		}

		let { title, description, date, location, start_stack, blind_levels, game_type, buy_in, fee, registration_close, max_players } = req.body;

		// Store the timezone information with the date
		// This assumes the date is coming in as an ISO string or similar format
		// If it's not, you'll need to adjust this approach
		if (typeof date === 'string') {
			// Ensure the date is stored with timezone information
			// This preserves the local time that was entered
			date = new Date(date);
		}

		if (!registration_close) {
			registration_close = date;
		}

		if (!fee) {
			fee = buy_in * 0.2;
		}

		const event = new Event({
			title,
			description,
			date,
			registration_close,
			location,
			start_stack,
			blind_levels,
			game_type,
			buy_in,
			fee,
			max_players: max_players || 0
		});

		await event.save();
		console.log("Event created successfully:", event._id);

		return res.status(201).json(event);

	} catch (error) {
		console.error("Error creating event:", error);
		return res.status(500).json({ 
			error: "Failed to create event", 
			details: error.message 
		});
	}
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

// New endpoint to get registration count
router.get("/:id/registrations/count", async (req, res) => {
	try {
		const { id } = req.params;
		console.log("\n=== Getting Registration Count ===");
		console.log("Event ID:", id);

		// Query all registrations for this event
		const registrations = await Registration.find({ event_id: id });
		console.log("Found registrations:", registrations.length);

		// Log details of each registration
		registrations.forEach((reg, index) => {
			console.log(`\nRegistration ${index + 1}:`, {
				name: reg.name,
				email: reg.email,
				status: reg.btcpay_status,
				date: reg.date
			});
		});

		res.json({
			message: "Registration query successful",
			eventId: id,
			total_registrations: registrations.length,
			registrations: registrations.map(reg => ({
				name: reg.name,
				status: reg.btcpay_status,
				date: reg.date
			}))
		});

	} catch (error) {
		console.error("Error in registration count:", error);
		res.status(500).json({ 
			error: "Failed to get registrations",
			message: error.message 
		});
	}
});

module.exports = router;
