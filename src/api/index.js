const express = require("express");
const app = express();

// use cors
const cors = require("cors");
app.use(cors({
  origin: [
    'https://bitcoin-poker-tour-frontend-y8stp.ondigitalocean.app',
    'https://bitcoinpokertour.com',
    'http://localhost:3000' // Keep this for local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'btcpay-sig'],
  credentials: true
}));

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");

// Import Swagger
const swagger = require("./swagger");

// Connect to database
connectDB();

// Initialize Swagger
swagger(app);

// Print webhook secret on startup
console.log('BTCPay Webhook Secret:', process.env.BTCPAY_WEBHOOK_SECRET || 'NOT SET - Please add to .env file');

// Add body parsing middleware - MOVE THIS NEAR THE TOP, after cors but before routes
const crypto = require('crypto');

// Raw body parsing for webhook verification
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
    limit: '10mb'
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post("/btcpaywebhook", async (req, res) => {
    try {
        console.log("\n=== BTCPay Webhook Received ===");
        console.log("Webhook Headers:", JSON.stringify(req.headers, null, 2));
        console.log("Webhook Body:", JSON.stringify(req.body, null, 2));
        
        // Verify BTCPay signature
        const signature = req.headers['btcpay-sig'];
        const rawBody = req.rawBody;
        const secret = process.env.BTCPAY_WEBHOOK_SECRET;
        
        if (!signature || !rawBody || !secret) {
            console.log("Missing components:", {
                hasSignature: !!signature,
                hasRawBody: !!rawBody,
                hasSecret: !!secret
            });
            throw new Error('Missing signature, body, or webhook secret');
        }

        // Verify signature
        const expectedSig = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest('hex');
        
        console.log("Signature verification:", {
            received: signature,
            expected: `sha256=${expectedSig}`
        });

        if (`sha256=${expectedSig}` !== signature) {
            throw new Error('Invalid signature');
        }

        const payload = req.body;
        console.log("Processing webhook payload:", JSON.stringify(payload, null, 2));

        // Update registration record if this is a payment notification
        if (payload.type === 'InvoiceSettled') {
            const invoiceId = payload.invoiceId;
            
            console.log(`Updating registration for invoice ${invoiceId}`);
            
            // Update the registration record
            const result = await mongoose.model('Registration').findOneAndUpdate(
                { btcpay_invoice_id: invoiceId },
                { 
                    btcpay_status: 'Settled',
                    paid_date: new Date()
                },
                { new: true } // Return the updated document
            );
            
            console.log("Update result:", result);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(400).json({
            error: "Webhook processing failed",
            message: error.message
        });
    }
});

// Add this new endpoint
app.get("/checkregistrationstatus/:invoiceId", async (req, res) => {
    try {
        const { invoiceId } = req.params;
        console.log(`Checking registration status for invoice: ${invoiceId}`);

        const registration = await mongoose.model('Registration').findOne({
            btcpay_invoice_id: invoiceId
        });

        if (!registration) {
            return res.status(404).json({ error: "Registration not found" });
        }

        return res.json({
            status: registration.btcpay_status,
            registration_id: registration._id,
            paid_date: registration.paid_date
        });

    } catch (error) {
        console.error("Error checking registration status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Routes
const news = require("./routes/news");
const registration = require("./routes/registration");
const schedule = require("./routes/schedule");
const sponsors = require("./routes/sponsors");

// Routes
app.use("/news", news);
app.use("/registration", registration);
app.use("/schedule", schedule);
app.use("/sponsors", sponsors);

// Add general request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Start server
const PORT = process.env.API_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
