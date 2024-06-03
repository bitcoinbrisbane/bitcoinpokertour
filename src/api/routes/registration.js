const express = require("express");
const router = express.Router();

const Registration = require("../schemas/Registration");

router.get("/:eventid", async (req, res) => {

    const event_id = req.params.eventid;
    const registrations = await Registration.findById(event_id);

    return res.json(registrations);
});

module.exports = router;
