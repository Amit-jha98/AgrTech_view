const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather"); // ✅ Fix import path

router.get("/", weatherController.getWeather);

module.exports = router;
