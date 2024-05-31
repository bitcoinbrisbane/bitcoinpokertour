const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// const connectDB = require("./config/dbConfig");
// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

router.get("/:eventid", async (req, res) => {

    const event_id = req.params.eventid;
    
});

module.exports = router;
