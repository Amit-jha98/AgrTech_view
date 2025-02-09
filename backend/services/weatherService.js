const axios = require("axios");
const admin = require("firebase-admin");
const { db } = require("../config/firebaseConfig");
require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

exports.fetchWeatherData = async (location) => {
  try {
    console.log("Fetching weather data for:", location);

    const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
      axios.get(`${BASE_URL}/current.json`, {
        params: { key: API_KEY, q: location, aqi: "yes" }
      }),
      axios.get(`${BASE_URL}/forecast.json`, {
        params: { key: API_KEY, q: location, days: 5, aqi: "yes" }
      })
    ]);

    const currentData = currentWeatherResponse.data;
    const forecastData = forecastWeatherResponse.data;

    // Store in Firestore with timestamp as document ID
    const timestamp = admin.firestore.Timestamp.now();
    const docId = `${location}_${timestamp.toDate().getTime()}`;

    await Promise.all([
      db.collection("weather_data").doc(docId).set({
        location,
        locationData: currentData.location,
        current: currentData.current,
        timestamp
      }),
      db.collection("weather_forecast").doc(docId).set({
        location,
        locationData: forecastData.location,
        forecast: forecastData.forecast,
        timestamp
      })
    ]);

    return { current: currentData, forecast: forecastData };
  } catch (error) {
    console.error("🔥 Weather API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data");
  }
};

exports.getPastWeatherData = async (location) => {
  try {
    // Fetch weather data
    const weatherSnapshot = await db.collection("weather_data")
      .where("location", "==", location) // Query by location
      .orderBy("timestamp", "desc") // Sort by timestamp (most recent first)
      .limit(10) // Limit to the 10 most recent entries
      .get();

    // Fetch forecast data
    const forecastSnapshot = await db.collection("weather_forecast")
      .where("location", "==", location) // Query by location
      .orderBy("timestamp", "desc") // Sort by timestamp (most recent first)
      .limit(10) // Limit to the 10 most recent entries
      .get();

    // Check if both collections are empty
    if (weatherSnapshot.empty && forecastSnapshot.empty) {
      throw new Error("No past weather data found for this location.");
    }

    // Extract data from snapshots
    const pastWeatherData = {
      weather: weatherSnapshot.docs.map(doc => doc.data()), // Array of weather data
      forecast: forecastSnapshot.docs.map(doc => doc.data()) // Array of forecast data
    };

    return pastWeatherData;
  } catch (error) {
    console.error("Firestore Error:", error.message);
    throw new Error("Failed to fetch past weather data.");
  }
};