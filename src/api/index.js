const express = require("express");
const app = express();

// use cors
const cors = require("cors");
app.use(cors());

// Routes
const events = require("./events");

// Routes
app.use("/events", events);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
