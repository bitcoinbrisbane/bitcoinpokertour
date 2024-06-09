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
const schedule = require("./routes/schedule");
const registration = require("./routes/registration");

// Routes
app.use("/schedule", schedule);
app.use("/registration", registration);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
