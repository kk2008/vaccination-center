const express = require('express');
const router = express.Router();
module.exports = router;

const RES = require('../function/res.js');
const GENERAL = require('../function/general.js');
const stored = require('../stored/data.js');

router.get('/', async (req, res) => {
    console.log('GET /api/booking');
    try {
        const bookings = stored["bookings"]

        RES.solve(res, {
            "status": true,
            "data": bookings
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

router.get('/:id', async (req, res) => {
    let booking_id = req.params["id"];
    console.log(`GET /api/booking/${booking_id}`);
    try {
        booking_id = Number(booking_id);
        if (!booking_id) throw "Error 1";

        const bookings = stored["bookings"];
        let selected_booking;
        for (let i in bookings) {
            if (bookings[i]["id"] == booking_id) { selected_booking = bookings[i]; break; }
        }

        RES.solve(res, {
            "status": true,
            "data": selected_booking
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

let check_bookings_for_vaccine_center = (vaccine_center_id, slot, booking_id) => {
    return new Promise((resolve, reject) => {
        try {
            const vaccine_centers = stored["vaccine_centers"];
            let selected_vaccine_center = vaccine_centers.filter(c => {
                if (c["id"] == vaccine_center_id) return c;
            });
            if (vaccine_center_id != 0 && !selected_vaccine_center.length) throw "Invalid Vaccine Center";

            selected_vaccine_center = Object.assign({}, selected_vaccine_center[0]);
            const bookings = stored["bookings"];
            let all_bookings_of_this_center = bookings.filter(b => {
                if (!booking_id) {
                    if (b["vaccine_center_id"] == selected_vaccine_center["id"]) return b;
                }
                else if (booking_id) {
                    if (b["vaccine_center_id"] == selected_vaccine_center["id"] && b["id"] != booking_id) return b;
                }
            });
            let checked_duplicated_slot = all_bookings_of_this_center.filter(b => {
                if (b["slot"] == slot) return b;
            });
            if (checked_duplicated_slot.length) throw "This slot is full";
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    });
};

router.post('/', async (req, res) => {
    console.log('POST /api/booking');
    try {
        if (!req.body) throw "Error 1";
        let body = req.body;
        if (typeof body["vaccine_center_id"] != "number") throw "Error 2";
        if (!(body["nric"] && body["name"] && body["vaccine_center_id"] && body["slot"])) throw "Error 2";

        const checked_duplicated_nric = stored["bookings"].filter(b => {
            if (b["nric"] == body["nric"]) return b;
        });
        if (checked_duplicated_nric.length) throw "Error 3";

        await check_bookings_for_vaccine_center(body["vaccine_center_id"], body["slot"]);

        const last_booking_id = stored["bookings"].length + 1;
        body["id"] = last_booking_id;
        stored["bookings"].push(body);
        // console.log(stored["bookings"])

        RES.solve(res, {
            "status": true,
            "message": "Submitted"
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

router.post('/:id', async (req, res) => {
    let booking_id = req.params["id"];
    console.log(`POST /api/booking/${booking_id}`);
    try {
        booking_id = Number(booking_id);
        if (!booking_id) throw "Error 1";

        if (!req.body) throw "Error 1";
        let body = req.body;
        if (typeof body["vaccine_center_id"] != "number") throw "Error 2";
        if (!(body["nric"] && body["name"] && body["vaccine_center_id"] && body["slot"])) throw "Error 2";

        const checked_booking = stored["bookings"].filter(b => {
            if (b["id"] == booking_id) return b;
        });
        if (!checked_booking.length) throw "Error 3";

        await check_bookings_for_vaccine_center(body["vaccine_center_id"], body["slot"], booking_id);
        for (let i in stored["bookings"]) {
            if (stored["bookings"][i]["id"] == booking_id) {
                stored["bookings"][i]["nric"] = body["nric"];
                stored["bookings"][i]["name"] = body["name"];
                stored["bookings"][i]["vaccine_center_id"] = body["vaccine_center_id"];
                stored["bookings"][i]["slot"] = body["slot"];
                break;
            }
        }
        // console.log(stored["bookings"])

        RES.solve(res, {
            "status": true,
            "message": "Submitted"
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

router.delete('/:id', async (req, res) => {
    let booking_id = req.params["id"];
    console.log(`DELETE /api/booking/${booking_id}`);
    try {
        booking_id = Number(booking_id);
        if (!booking_id) throw "Error 1";

        stored["bookings"] = stored["bookings"].filter(b => {
            if (b["id"] != booking_id) return b;
        })

        RES.solve(res, {
            "status": true,
            "message": "Submitted"
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
