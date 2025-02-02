import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Table, Alert } from "react-bootstrap";
import { getWeather, getPastWeather } from "../services/weather";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [pastWeatherData, setPastWeatherData] = useState(null);
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
      setPastWeatherData(null);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPastWeather = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await getPastWeather(location);
      setPastWeatherData(Array.isArray(data.weather) ? data.weather : [data.weather]);
    } catch (err) {
      setError("Failed to fetch past weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4">Weather Forecast</h1>
          <p className="lead">Get real-time and past weather updates for your location.</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter location (e.g., New York, USA)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Get Weather"}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card>
        </Col>
      </Row>

      {weatherData?.current && (
        <Row className="mt-5">
          <Col md={6} className="mx-auto">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>
                  {weatherData.current.location.name}, {weatherData.current.location.country}
                </Card.Title>
                <Table striped bordered hover className="mt-3">
                  <tbody>
                    <tr><td>Temperature</td><td>{weatherData.current.current.temp_c}°C</td></tr>
                    <tr><td>Condition</td><td>{weatherData.current.current.condition.text}</td></tr>
                    <tr><td>Humidity</td><td>{weatherData.current.current.humidity}%</td></tr>
                    <tr><td>Wind Speed</td><td>{weatherData.current.current.wind_kph} km/h</td></tr>
                    <tr><td>Feels Like</td><td>{weatherData.current.current.feelslike_c}°C</td></tr>
                    <tr><td>Last Updated</td><td>{weatherData.current.current.last_updated}</td></tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className="mt-4 justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="info" onClick={handleFetchPastWeather} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Fetch Past Weather"}
          </Button>
        </Col>
      </Row>

      {pastWeatherData && pastWeatherData.length > 0 && (
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <h2 className="text-center">Past Weather Data</h2>
            <Table striped bordered hover className="mt-3 shadow">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature (°C)</th>
                  <th>Condition</th>
                  <th>Wind (km/h)</th>
                  {/* <th>Last Updated</th> */}
                </tr>
              </thead>
              <tbody>
                {pastWeatherData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.current?.last_updated || "N/A"}</td>
                    <td>{data.current?.temp_c || "N/A"}°C</td>
                    <td>{data.current?.condition?.text || "N/A"}</td>
                    <td>{data.current?.wind_kph || "N/A"} km/h</td>
                    {/* <td>{data.current?.last_updated || "N/A"}</td> */}
                  </tr>
                ))}
              </tbody>
              <tbody>
                {pastWeatherData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.current?.last_updated || "N/A"}</td>
                    <td>{data.current?.temp_c || "N/A"}°C</td>
                    <td>{data.current?.condition?.text || "N/A"}</td>
                    <td>{data.current?.wind_kph || "N/A"} km/h</td>
                    {/* <td>{data.current?.last_updated || "N/A"}</td> */}
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
