const express = require("express");
const router = express.Router();

// use json
router.use(express.json());

const Sponsor = require("../schemas/sponsor");

router.get("/", async (req, res) => {
  const sponsors = await Sponsor.find();

  if (sponsors.length === 0) {
    const sponsors = [
      {
        name: "Bitcoin Brisbane",
        logo: "https://bitcoinbrisbane.com.au/wp-content/uploads/2021/06/bitcoinbrisbane_logo.png",
        website: "https://bitcoinbrisbane.com.au",
        tag_line: "Bitcoin Brisbane - The Bitcoin Community in Brisbane",
        tier: "Whale",
      },
    ];

    return res.json(sponsors);
  }

  res.json(sponsors);
});

router.post("/", async (req, res) => {
  // Check the header for an API key
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, logo, website, tag_line, tier } = req.body;

  const sponsor = new Sponsor({
    name,
    logo,
    website,
    tag_line,
    tier,
  });

  await sponsor.save();

  res.status(201).json(sponsor);
});

module.exports = router;
