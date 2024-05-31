const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// const connectDB = require("./config/dbConfig");
// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

router.get("/", async (req, res) => {
  //const events = await Event.find();

  const events = [
    {
      id: 1,
      title: "Event 1",
      description: "This is event 1",
      date: "2021-01-01",
    },
    {
      id: 2,
      title: "Event 2",
      description: "This is event 2",
      date: "2021-02-02",
    },
    {
      id: 3,
      title: "Event 3",
      description: "This is event 3",
      date: "2021-03-03",
    },
  ];

  res.json(events);
});

module.exports = router;
