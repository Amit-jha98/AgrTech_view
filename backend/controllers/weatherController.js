const weatherService = require("../services/weatherService");

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
const decryptData = (encryptedData, ivHex) => {
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString());
};

<<<<<<< HEAD
=======
>>>>>>> code_daan
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
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