const express = require("express");
const router = express.Router();

const generateMockData = () => ({
  moisture: Math.random() * 100,
  humidity: Math.random() * 100,
  temperature: 25 + Math.random() * 10,
  pH: 6.5 + Math.random(),
  nutrients: {
    N: 15 + Math.random() * 5,
    P: 10 + Math.random() * 3,
    K: 12 + Math.random() * 4
  },
  timestamp: new Date().toISOString()
});

router.get("/sensor-data", (req, res) => {
  res.json(generateMockData());
});

module.exports = router;
