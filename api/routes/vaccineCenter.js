const express = require('express');
const router = express.Router();
module.exports = router;

const RES = require('../function/res.js');
const GENERAL = require('../function/general.js');
const stored = require('../stored/data.js');

router.get('/', async (req, res) => {
    console.log('GET /api/vaccineCenter');
    try {
        const vaccine_centers = stored["vaccine_centers"];

        RES.solve(res, {
            "status": true,
            "data": vaccine_centers
        });
    }
    catch (error) {
        console.log({ error });
        if (typeof error != "string") error = "Invalid action. Please contact administrator!";
        RES.error(res, {
            "status": false,
            "message": error
        });
    }
});