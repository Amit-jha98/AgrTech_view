import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, ListGroup } from "react-bootstrap";
import { getWeather } from "../services/weather";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeather(location);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Frontend Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-5">
        <Col>
          <h1>Weather Forecast</h1>
          <p className="lead">Get real-time weather updates for your location.</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter location (e.g., Patna, Bihar)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Get Weather"}
            </Button>
          </Form>

          {error && <p className="text-danger mt-3">{error}</p>}
        </Col>
      </Row>

      {/* Current Weather */}
      {weatherData?.current && (
        <Row className="mt-5">
          <Col md={6} className="mx-auto">
            <Card>
              <Card.Body>
                <Card.Title>
                  {weatherData.current.location.name}, {weatherData.current.location.country}
                </Card.Title>
                <Card.Text>
                  Temperature: {weatherData.current.current.temp_c}°C<br />
                  Condition: {weatherData.current.current.condition.text}<br />
                  Humidity: {weatherData.current.current.humidity}%<br />
                  Wind Speed: {weatherData.current.current.wind_kph} km/h<br />
                  Feels Like: {weatherData.current.current.feelslike_c}°C
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Weather Forecast */}
      {weatherData?.forecast && (
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <h2>3-Day Weather Forecast</h2>
            <ListGroup>
              {weatherData.forecast.forecast.forecastday.map((day, index) => (
                <ListGroup.Item key={index}>
                  <strong>{new Date(day.date).toLocaleDateString()}</strong>
                  <br />
                  Max Temp: {day.day.maxtemp_c}°C
                  <br />
                  Min Temp: {day.day.mintemp_c}°C
                  <br />
                  Condition: {day.day.condition.text}
                  <br />
                  Chance of Rain: {day.day.daily_chance_of_rain}%
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Weather;