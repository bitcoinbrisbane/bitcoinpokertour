const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bodyParser = require("body-parser");

const Event = require("../schemas/event");
const Registration = require("../schemas/registration");
const { getRegistrationAddress } = require("../utils");

const axios = require("axios");

// use json
router.use(express.json());

// Standardize on BTCPAY_URL
const btcPayServerUrl = process.env.BTCPAY_URL;

if (!btcPayServerUrl) {
	console.error("BTCPAY_URL not configured");
	return res.status(500).json({
		error: "Payment system configuration error",
		details: "BTCPAY_URL not configured"
	});
}

// Add some logging to help debug
console.log("BTCPay Server URL:", btcPayServerUrl);

router.get("/:eventid", async (req, res) => {
	const { eventid } = req.params;
	console.log("Registrations for ", eventid);
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

			try {
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
			} catch (error) {
				console.error(error);
				registration.status = "Error";
			}
		}
	}

	const filtered = responses.filter(registration => registration.status !== "Expired");

	return res.json(filtered);
});

router.post("/:eventid", async (req, res) => {
	try {
		const { eventid } = req.params;
		console.log("\n=== Registration Request ===");
		console.log("Event ID:", eventid);
		console.log("Request Body:", req.body);

		const { name, email, bitcoin_address } = req.body;

		// Log validation checks
		console.log("Validation checks:", {
			name: !!name,
			email: !!email,
			bitcoin_address: !!bitcoin_address
		});

		// Validate required fields
		if (!name || !email || !bitcoin_address) {
			console.log("Missing required fields");
			return res.status(400).json({
				error: "Missing required fields",
				required: ["name", "email", "bitcoin_address"],
				received: { name, email, bitcoin_address }
			});
		}

		// Find event
		const event = await Event.findOne({ _id: eventid });
		console.log("Found event:", event ? "Yes" : "No");

		if (!event) {
			console.log("Event not found:", eventid);
			return res.status(404).json({ error: "Event not found" });
		}

		// Check for existing registration
		const existingRegistration = await Registration.findOne({
			email: email.toLowerCase().trim(),
			event_id: eventid
		});

		console.log("Existing registration check:", {
			exists: !!existingRegistration,
			email: email.toLowerCase().trim(),
			eventId: eventid
		});

		if (existingRegistration) {
			console.log("Email already registered:", email);
			return res.status(400).json({
				error: "Email already registered",
				registration_id: existingRegistration._id
			});
		}

		// Calculate total amount
		const totalAmount = event.buy_in + event.fee;
		console.log("Total amount:", totalAmount);

		// Create registration
		let registration = new Registration({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			bitcoin_address,
			date: new Date(),
			event_id: eventid,
			btcpay_status: "New",
			amount: totalAmount,
			currency: "BTC"
		});

		console.log("Creating registration:", registration);
		registration = await registration.save();
		console.log("Registration saved:", registration._id);

		// Create BTCPay invoice
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `token ${process.env.BTCPAY_API_KEY}`
			}
		};

		const invoiceData = {
			amount: totalAmount,
			currency: "BTC",
			metadata: {
				orderId: registration._id,
				buyerEmail: email,
				buyerName: name,
				eventId: eventid,
				eventTitle: event.title
			},
			checkout: {
				redirectURL: `${process.env.NEXT_PUBLIC_URL}/registration/${eventid}/success`,
				redirectAutomatically: true
			}
		};

		console.log("Full BTCPay request:", {
			url: `${btcPayServerUrl}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices`,
			headers: {
				...config.headers,
				Authorization: "token [MASKED]"
			},
			data: invoiceData
		});

		try {
			const invoiceUrl = `${btcPayServerUrl}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices`;
			console.log("Creating invoice at:", invoiceUrl);
			
			const btcpayResponse = await axios.post(
				invoiceUrl,
				invoiceData,
				config
			);

			console.log("BTCPay response:", btcpayResponse.data);

			registration.btcpay_invoice_id = btcpayResponse.data.id;
			await registration.save();

			// Return the checkout URL along with the registration data
			return res.status(201).json({
				success: true,
				registration: registration,
				btcpay_invoice_id: btcpayResponse.data.id,
				checkoutUrl: btcpayResponse.data.checkoutLink || `${btcPayServerUrl}/i/${btcpayResponse.data.id}`
			});
		} catch (btcpayError) {
			console.error("BTCPay Server Error:", btcpayError.response?.data || btcpayError);
			await Registration.findByIdAndDelete(registration._id);
			return res.status(500).json({
				error: "Failed to create payment invoice",
				details: btcpayError.response?.data || btcpayError.message
			});
		}
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({
			error: "Internal server error",
			details: error.message
		});
	}
});

module.exports = router;
