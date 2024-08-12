const express = require("express");
const router = express.Router();

// use bcrypt
const bcrypt = require("bcrypt");

// use json
router.use(express.json());

const Player = require("../schemas/player");

router.get("/", async (req, res) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	// const { id } = req.query;
	const players = await Player.find();

	res.json(players);
});

router.post("/", async (req, res) => {
	const { name, email, password, bitcoin_address } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ error: "Missing required fields" });
	}

    // Check password is more than 6 characters
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

	// Check if player already exists
	const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
        return res.status(409).json({ error: "Player already exists" });
    }

	const player = new Player({
		name,
		email,
		password: bcrypt.hashSync(password, 10),
		bitcoin_address,
		created_at: new Date()
	});

	await player.save();

	res.status(201).json(player);
});


module.exports = router;