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
		console.log("\n🎯 NEW REGISTRATION REQUEST");
		console.log("📅 Event ID:", eventid);
		console.log("📧 Email:", req.body.email);
		console.log("👤 Name:", req.body.name);
		console.log("🔸 Bitcoin Address:", req.body.bitcoin_address);

		const { name, email, bitcoin_address } = req.body;

		// Log validation checks
		console.log("\n✅ VALIDATION CHECKS:");
		console.log("   Name provided:", !!name);
		console.log("   Email provided:", !!email);
		console.log("   Bitcoin address provided:", !!bitcoin_address);

		// Validate required fields
		if (!name || !email || !bitcoin_address) {
			console.log("❌ VALIDATION FAILED - Missing required fields");
			return res.status(400).json({
				error: "Missing required fields",
				required: ["name", "email", "bitcoin_address"],
				received: { name, email, bitcoin_address }
			});
		}

		console.log("✅ VALIDATION PASSED - All fields provided");

		// Find event
		console.log("\n🔍 LOOKING UP EVENT...");
		const event = await Event.findOne({ _id: eventid });
		
		if (!event) {
			console.log("❌ EVENT NOT FOUND:", eventid);
			return res.status(404).json({ error: "Event not found" });
		}

		console.log("✅ EVENT FOUND:");
		console.log("   Title:", event.title);
		console.log("   Buy-in:", event.buy_in, "BTC");
		console.log("   Fee:", event.fee, "BTC");

		// Check for existing registration
		console.log("\n🔍 CHECKING FOR DUPLICATE REGISTRATION...");
		const existingRegistration = await Registration.findOne({
			email: email.toLowerCase().trim(),
			event_id: eventid
		});

		if (existingRegistration) {
			console.log("❌ DUPLICATE REGISTRATION DETECTED");
			console.log("   Email:", email);
			console.log("   Existing registration ID:", existingRegistration._id);
			return res.status(400).json({
				error: "Email already registered",
				registration_id: existingRegistration._id
			});
		}

		console.log("✅ NO DUPLICATE FOUND - Proceeding with registration");

		// Calculate total amount
		const totalAmount = event.buy_in + event.fee;
		console.log("\n💰 PAYMENT CALCULATION:");
		console.log("   Buy-in:", event.buy_in, "BTC");
		console.log("   Fee:", event.fee, "BTC");
		console.log("   Total:", totalAmount, "BTC");

		// Create registration with current Brisbane time converted to UTC
		console.log("\n💾 CREATING REGISTRATION IN DATABASE...");
		let registration = new Registration({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			bitcoin_address,
			date: new Date(), // This stores current UTC time
			event_id: eventid,
			btcpay_status: "New",
			amount: totalAmount,
			currency: "BTC"
		});

		registration = await registration.save();
		console.log("✅ REGISTRATION SAVED TO DATABASE");
		console.log("   Registration ID:", registration._id);
		console.log("   Status:", registration.btcpay_status);
		console.log("   Amount:", registration.amount, "BTC");

		// Create BTCPay invoice
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `token ${process.env.BTCPAY_API_KEY}`
			}
		};

		// Fix redirect URL - fallback to localhost if env var not set
		const frontendUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
		
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
				redirectURL: `${frontendUrl}/registration/${eventid}/success`,
				redirectAutomatically: true
			}
		};

		console.log("🔗 Payment redirect URL:", invoiceData.checkout.redirectURL);

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
			console.log("\n🔄 ATTEMPTING BTCPAY PAYMENT CREATION");
			console.log("📍 BTCPay Server URL:", btcPayServerUrl);
			console.log("🔗 Invoice URL:", invoiceUrl);
			console.log("💰 Amount:", invoiceData.amount, "BTC");
			console.log("👤 Customer:", invoiceData.metadata.buyerName, "-", invoiceData.metadata.buyerEmail);
			
			const btcpayResponse = await axios.post(
				invoiceUrl,
				invoiceData,
				config
			);

			console.log("✅ BTCPAY SUCCESS - Invoice Created!");
			console.log("🎯 Invoice ID:", btcpayResponse.data.id);
			console.log("🔗 Checkout URL:", btcpayResponse.data.checkoutLink);

			registration.btcpay_invoice_id = btcpayResponse.data.id;
			await registration.save();

			console.log("✅ REGISTRATION COMPLETE - Payment invoice linked to registration");

			// Return the checkout URL along with the registration data
			return res.status(201).json({
				success: true,
				registration: registration,
				btcpay_invoice_id: btcpayResponse.data.id,
				checkoutUrl: btcpayResponse.data.checkoutLink || `${btcPayServerUrl}/i/${btcpayResponse.data.id}`
			});
		} catch (btcpayError) {
			console.log("\n❌ BTCPAY PAYMENT CREATION FAILED!");
			console.log("🚨 Error Type:", btcpayError.code || 'Unknown');
			console.log("🚨 Error Message:", btcpayError.message);
			console.log("🌐 Network Issue:", btcpayError.code === 'ECONNREFUSED' ? 'YES - Cannot reach BTCPay server' : 'NO');
			console.log("📍 BTCPay Server:", btcPayServerUrl);
			console.log("🔧 Possible Issues:");
			console.log("   - BTCPay server is down");
			console.log("   - Network connectivity issue");
			console.log("   - Invalid API credentials");
			console.log("   - Firewall blocking connection");
			
			console.log("\n🗑️ CLEANING UP - Deleting registration due to payment failure");
			console.log("📝 Registration ID being deleted:", registration._id);
			
			await Registration.findByIdAndDelete(registration._id);
			
			console.log("✅ CLEANUP COMPLETE - Registration removed from database");
			console.log("💡 RECOMMENDATION: Check BTCPay server status and network connectivity");

			return res.status(500).json({
				error: "Failed to create payment invoice",
				details: btcpayError.response?.data || btcpayError.message,
				btcpay_server_status: "UNREACHABLE",
				registration_status: "DELETED_DUE_TO_PAYMENT_FAILURE"
			});
		}
	} catch (error) {
		console.log("\n❌ REGISTRATION PROCESS FAILED");
		console.log("🚨 Error Type:", error.name);
		console.log("🚨 Error Message:", error.message);
		console.log("📍 Request Details:", {
			eventId: req.params.eventid,
			email: req.body.email,
			endpoint: `/registration/${req.params.eventid}`
		});
		console.log("💡 Check above logs for specific failure point");
		
		return res.status(500).json({
			error: "Registration failed",
			message: error.message,
			registration_status: "FAILED"
		});
	}
});

module.exports = router;
