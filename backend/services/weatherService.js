const axios = require("axios");
const admin = require("firebase-admin");
const { db } = require("../config/firebaseConfig"); // ✅ Correct import
require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

exports.fetchWeatherData = async (location) => {
  try {
    console.log("Fetching weather data for:", location);

    // Fetch current weather
    const currentWeatherResponse = await axios.get(`${BASE_URL}/current.json`, {
      params: { key: API_KEY, q: location, aqi: "yes" }
    });

    // Fetch forecast weather
    const forecastWeatherResponse = await axios.get(`${BASE_URL}/forecast.json`, {
      params: { key: API_KEY, q: location, days: 3, aqi: "yes" }
    });

    const currentData = currentWeatherResponse.data;
    const forecastData = forecastWeatherResponse.data;

    console.log("✔ Current Weather API Response:", JSON.stringify(currentData, null, 2));
    console.log("✔ Forecast API Response:", JSON.stringify(forecastData, null, 2));

    // Store in Firestore
    await db.collection("weather_data").doc(location).set({
      location: currentData.location,
      current: currentData.current,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    await db.collection("weather_forecast").doc(location).set({
      location: forecastData.location,
      forecast: forecastData.forecast,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return { current: currentData, forecast: forecastData };
  } catch (error) {
    console.error("🔥 Weather API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data.");
  }
};