import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Typography } from "@mui/material"; // ✅ Import Typography from Material-UI
import ChatbotComponent from '../components/ChatBot/ChatBot'; // ✅ Ensure correct import
import ErrorBoundary from '../components/ChatBot/ErrorBoundary'; // ✅ Ensure correct import

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to different pages
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Container fluid className="p-0">
      {/* Header Section */}
      <header className="bg-success text-white text-center py-5">
        <h1>Welcome to AgriTech Solutions</h1>
        <p className="lead">Empowering Farmers with AI-Driven Insights</p>
      </header>

      <Container maxWidth="md">
        {/* ✅ Fixed import for Typography */}
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Agriculture Platform
        </Typography>

        {/* ✅ Fixed incorrect component name from <ChatBot /> to <ChatbotComponent /> */}
        <ChatbotComponent />
      </Container>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm cursor-pointer" onClick={() => navigateTo("/weather")}>
                <Card.Body className="text-center">
                  <Card.Title>Weather Prediction</Card.Title>
                  <Card.Text>Get accurate weather forecasts and alerts for your farm.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm cursor-pointer" onClick={() => navigateTo("/soil-health")}>
                <Card.Body className="text-center">
                  <Card.Title>Soil Health Monitoring</Card.Title>
                  <Card.Text>Monitor soil conditions and get recommendations for better yields.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm cursor-pointer" onClick={() => navigateTo("/crop-advisory")}>
                <Card.Body className="text-center">
                  <Card.Title>Crop Advisory</Card.Title>
                  <Card.Text>Receive AI-powered advice for planting, fertilizing, and pest control.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="bg-light py-5">
        {/* <ErrorBoundary>
          <ChatbotComponent />
        </ErrorBoundary> */}
        <Container className="text-center">
          <h2>Ready to Get Started?</h2>
          <Button variant="success" size="lg" onClick={() => navigateTo("/dashboard")}>
            Go to Dashboard
          </Button>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2023 AgriTech Solutions. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default Home;
