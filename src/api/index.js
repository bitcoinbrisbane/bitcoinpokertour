const express = require("express");
const app = express();

// use cors
const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const connectDB = require("./config/dbConfig");
connectDB();

// Routes
const events = require("./routes/events");
const registration = require("./routes/registration");
const sponsors = require("./routes/sponsors");

// Routes
app.use("/events", events);
app.use("/registration", registration);
app.use("/sponsors", sponsors);

// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
