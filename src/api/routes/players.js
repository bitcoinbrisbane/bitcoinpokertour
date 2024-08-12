const express = require("express");
const router = express.Router();

// use bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

router.get("/:id", async (req, res) => {
	let token = req.headers["authorization"];

	if (!jwt) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	// Remove Bearer from token
	token = token.replace("Bearer ", "");
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Check if token is valid
	if (!decoded) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	// compare the id from the token with the id from the request
	if (decoded.id !== id) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const player = await Player.findById(id);

	if (!player) {
		return res.status(404).json({ error: "Player not found" });
	}

	res.json(player);
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

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	const player = await Player.findOne({ email });

	if (!player) {
		return res.status(404).json({ error: "Player not found" });
	}

	if (!bcrypt.compareSync(password, player.password)) {
		return res.status(401).json({ error: "Invalid password" });
	}

	// Create JWT with jsonwebtoken
	const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, {
		expiresIn: "24h"
	});

	const response = {
		token,
		player : {
			id: player._id,
			name: player.name,
			email: player.email,
			bitcoin_address: player.bitcoin_address
		}
	};

	res.json(response);
});


module.exports = router;