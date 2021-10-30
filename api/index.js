const express = require('express');
const router = express.Router();
module.exports = router;

router.use("/vaccineCenter", require("./routes/vaccineCenter"));
router.use("/booking", require("./routes/booking"));