import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Table,
  Alert,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaCloudSun,
  FaMicrophone,
} from "react-icons/fa";
import { getWeather, getPastWeather } from "../services/weather";
import "../styles/weather.css"; // Optional custom CSS file for additional styling

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // For forecast table
  const [pastWeatherData, setPastWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user's location using the Geolocation API, with fallback to IP geolocation
  const fetchUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode using a free API service (BigDataCloud in this example)
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            if (data && data.city && data.countryName) {
              const loc = `${data.city}, ${data.countryName}`;
              setLocation(loc);
              fetchWeatherData(loc);
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback to IP-based geolocation if user denies permission or an error occurs
          fetchIPLocation();
        }
      );
    } else {
      // Fallback if geolocation is not supported
      fetchIPLocation();
    }
  };

  const fetchIPLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      if (data && data.city && data.country_name) {
        const loc = `${data.city}, ${data.country_name}`;
        setLocation(loc);
        fetchWeatherData(loc);
      }
    } catch (err) {
      console.error("IP-based location error:", err);
    }
  };

  // Fetch weather data for a given location
  const fetchWeatherData = async (loc) => {
    if (!loc) return;
    setLoading(true);
    setError("");
    try {
      const data = await getWeather(loc);
      console.log("Weather data received:", data); // Debug logging

      setWeatherData(data);

      // Check if forecast data exists and contains forecastday entries
      if (
        data &&
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday.length > 0
      ) {
        console.log("Forecast data received:", data.forecast); // Debug logging
        setForecastData(data.forecast);
      } else {
        console.warn("No forecast data found.");
        setForecastData(null);
      }
      setPastWeatherData(null);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Voice input using the Web Speech API
  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setLocation(transcript);
      fetchWeatherData(transcript);
    };
    recognition.onerror = (error) => {
      console.error("Voice recognition error:", error);
    };
  };

  // Auto-fetch location and weather data when the component mounts
  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Handler for manual weather search
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    fetchWeatherData(location);
  };

  // Handler to fetch past weather data
  const handleFetchPastWeather = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await getPastWeather(location);
      // Ensure that past weather data is stored as an array
      setPastWeatherData(Array.isArray(data.weather) ? data.weather : [data.weather]);
    } catch (err) {
      console.error("Error fetching past weather:", err);
      setError("Failed to fetch past weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="py-5 weather-container"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Header Section */}
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-3 font-weight-bold">
            <FaCloudSun className="mb-2" style={{ color: "#FFD700" }} /> Weather Forecast
          </h1>
          <p className="lead">
            Get real-time, forecast, and past weather updates for your location.
          </p>
        </Col>
      </Row>

      {/* Search/Form Card */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            className="p-4 shadow-sm modern-card"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "15px",
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="locationInput">
                <Form.Label>
                  <FaMapMarkerAlt /> Location
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location (e.g., New York, USA)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      <FaSearch /> Get Weather
                    </>
                  )}
                </Button>
                <Button variant="secondary" onClick={startVoiceInput} disabled={loading}>
                  <FaMicrophone /> Voice Input
                </Button>
              </div>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>

      {/* Current Weather Card */}
      {weatherData?.current && (
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <Card
              className="shadow-sm modern-card"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "15px",
                color: "#333",
              }}
            >
              <Card.Body>
                <Card.Title>
                  {weatherData.current.location.name},{" "}
                  {weatherData.current.location.country}
                </Card.Title>
                <Table
                  responsive
                  bordered
                  hover
                  className="mt-3 modern-table"
                  style={{ background: "#fff" }}
                >
                  <tbody>
                    <tr>
                      <td>Temperature</td>
                      <td>{weatherData.current.current.temp_c}°C</td>
                    </tr>
                    <tr>
                      <td>Condition</td>
                      <td>{weatherData.current.current.condition.text}</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td>{weatherData.current.current.humidity}%</td>
                    </tr>
                    <tr>
                      <td>Wind Speed</td>
                      <td>{weatherData.current.current.wind_kph} km/h</td>
                    </tr>
                    <tr>
                      <td>Feels Like</td>
                      <td>{weatherData.current.current.feelslike_c}°C</td>
                    </tr>
                    <tr>
                      <td>Last Updated</td>
                      <td>{weatherData.current.current.last_updated}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Forecast Table */}
      {forecastData &&
        forecastData.forecastday &&
        forecastData.forecastday.length > 0 && (
          <Row className="mt-5">
            <Col md={10} className="mx-auto">
              <h2 className="text-center mb-4">Weather Forecast</h2>
              <Table
                responsive
                bordered
                hover
                className="shadow-sm modern-table"
                style={{ background: "#fff", color: "#333" }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Max Temp (°C)</th>
                    <th>Min Temp (°C)</th>
                    <th>Condition</th>
                    <th>Wind (km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.forecastday.map((day, index) => (
                    <tr key={index}>
                      <td>{day.date}</td>
                      <td>{day.day.maxtemp_c}°C</td>
                      <td>{day.day.mintemp_c}°C</td>
                      <td>
                        {day.day.condition.text}{" "}
                        <img
                          src={
                            day.day.condition.icon.startsWith("//")
                              ? "https:" + day.day.condition.icon
                              : day.day.condition.icon
                          }
                          alt={day.day.condition.text}
                          style={{ width: "30px" }}
                        />
                      </td>
                      <td>{day.day.maxwind_kph} km/h</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

      {/* Button to fetch Past Weather */}
      <Row className="mt-4 justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="info" onClick={handleFetchPastWeather} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Fetch Past Weather"}
          </Button>
        </Col>
      </Row>

      {/* Past Weather Table */}
      {pastWeatherData && pastWeatherData.length > 0 && (
        <Row className="mt-5">
          <Col md={10} className="mx-auto">
            <h2 className="text-center">Past Weather Data</h2>
            <Table
              responsive
              bordered
              hover
              className="mt-3 shadow-sm modern-table"
              style={{ background: "#fff", color: "#333" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature (°C)</th>
                  <th>Condition</th>
                  <th>Wind (km/h)</th>
                </tr>
              </thead>
              <tbody>
                {pastWeatherData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.current?.last_updated || "N/A"}</td>
                    <td>{data.current?.temp_c || "N/A"}°C</td>
                    <td>{data.current?.condition?.text || "N/A"}</td>
                    <td>{data.current?.wind_kph || "N/A"} km/h</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Weather;
