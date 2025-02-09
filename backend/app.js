const express = require("express");
const weatherRoutes = require("./routes/weather");
const sensorDataRoutes = require("./routes/sensorData");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", weatherRoutes);
app.use("/api", sensorDataRoutes);

module.exports = app;
