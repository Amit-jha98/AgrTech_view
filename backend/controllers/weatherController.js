const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const weatherData = await weatherService.fetchWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getPastWeather = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const pastWeatherData = await weatherService.getPastWeatherData(location);
    res.json(pastWeatherData);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};