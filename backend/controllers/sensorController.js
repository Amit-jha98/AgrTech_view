// // server.js
// const express = require('express');
// const cors = require('cors');
// const { readSensorData } = require('./sensor-reader');

// const app = express();
// app.use(cors());

// app.get('/api/sensor-data', async (req, res) => {
//   try {
//     const sensorData = await readSensorData();
//     res.json({
//       ...sensorData,
//       timestamp: new Date().toLocaleTimeString()
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to read sensor data' });
//   }
// });

