const express = require("express");
const router = express.Router();

const axios = require("axios");

// use json
router.use(express.json());

router.get("/", async (req, res) => {
	const response = {
		treasury: "bc1pnsetunqt3tg5xq44ndnt95mnqk445gepyst4uk807vqr00cw22pst8dy74",
        addresses: []
	};

	const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${basic_auth}`
		}
	};

	const { data } = await axios.get(`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices?status=Settled`, config);

    // add addresses to response
    

	res.json(response);
});
