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
      },
    ];

    return res.json(sponsors);
  }

  res.json(sponsors);
});

module.exports = router;
