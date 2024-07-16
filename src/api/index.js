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
const addresses = require("./routes/addresses");
const news = require("./routes/news");
const registration = require("./routes/registration");
const schedule = require("./routes/schedule");
const sponsors = require("./routes/sponsors");

// Routes
app.use("/address", addresses);
app.use("/news", news);
app.use("/registration", registration);
app.use("/schedule", schedule);
app.use("/sponsors", sponsors);

// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
