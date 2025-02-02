const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();

router.get("/weather", weatherController.getWeather);
router.get("/past-weather", weatherController.getPastWeather);

module.exports = router;