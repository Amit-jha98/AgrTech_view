const express = require("express");
const weatherRoutes = require("./routes/weather");
<<<<<<< HEAD
const sensorDataRoutes = require("./routes/sensorData");
=======
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", weatherRoutes);
<<<<<<< HEAD
app.use("/api", sensorDataRoutes);

module.exports = app;
=======

module.exports = app;
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
