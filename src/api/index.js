const express = require("express");
const app = express();

// use cors
const cors = require("cors");
app.use(cors());

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

// Start server
const PORT = process.env.API_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
