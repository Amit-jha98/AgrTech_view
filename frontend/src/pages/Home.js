import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Container, Row, Col, Card } from "react-bootstrap";
import { Typography, Button, Box } from "@mui/material";
import { styled } from '@mui/system';
import ChatbotComponent from '../components/ChatBot/ChatBot';
import { WbSunny, Grass, Spa, Dashboard } from "@mui/icons-material";

const FeatureCard = styled(Card)(({ theme }) => ({
  minHeight: '320px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 35px rgba(0,0,0,0.15)'
  },
}));

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
  border: 0,
  borderRadius: '30px',
  color: 'white',
  padding: '16px 32px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'linear-gradient(45deg, #1B5E20 30%, #388E3C 90%)',
  },
});

const ChatbotWrapper = styled(Box)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
});

const Home = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #388E3C 0%, #2E7D32 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center',
      }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          AgriTech Pro
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Smart Farming Solutions for the Digital Age
        </Typography>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 600 }}>
          Our Features
        </Typography>

        <Row className="g-4" justifyContent="center">
          {[{
            icon: <WbSunny sx={{ fontSize: 60, color: '#FFD54F', mb: 3 }} />, 
            title: "Weather Insights", 
            text: "Real-time weather forecasts and predictive analytics for optimal farming decisions", 
            path: "/weather"
          }, {
            icon: <Grass sx={{ fontSize: 60, color: '#8D6E63', mb: 3 }} />, 
            title: "Soil Health AI", 
            text: "Advanced soil monitoring with AI-powered recommendations", 
            path: "/soil-health"
          }, {
            icon: <Spa sx={{ fontSize: 60, color: '#81C784', mb: 3 }} />, 
            title: "Crop Management", 
            text: "Smart crop advisory system with growth optimization strategies", 
            path: "/crop-advisory"
          },{
            icon: <Spa sx={{ fontSize: 60, color: '#81C784', mb: 3 }} />, 
            title: "Marketplace", 
            text: "The Marketplace for all your farming needs", 
            path: "/Marketplace"
          }].map((feature, index) => (
            <Col key={index} md={4}>
              <FeatureCard onClick={() => navigateTo(feature.path)}>
                <Card.Body className="text-center d-flex flex-column justify-content-between p-5">
                  {feature.icon}
                  <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">
                    {feature.text}
                  </Typography>
                </Card.Body>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #E8F5E9 0%, #ffffff 100%)',
        borderRadius: 4,
        py: 8,
        textAlign: 'center',
        mt: 6
      }}>
        <Dashboard sx={{ fontSize: 80, color: '#2E7D32', mb: 3 }} />
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Start Your Smart Farming Journey
        </Typography>
        <GradientButton onClick={() => navigateTo("/dashboard")}>
          Launch Dashboard
        </GradientButton>
      </Box>

      {/* Chatbot Integration (Fixed Button) */}
      <ChatbotWrapper>
        <ChatbotComponent />
      </ChatbotWrapper>

      {/* Footer */}
      <Box component="footer" sx={{
        bgcolor: '#1B5E20',
        color: 'white',
        py: 4,
        textAlign: 'center',
        mt: 8
      }}>
        <Typography variant="body1">
          © 2024 AgriTech Pro. Empowering sustainable agriculture through innovation.
        </Typography>
      </Box>
=======
<<<<<<< HEAD
import "../styles/home.css"; // Import CSS for styling
=======
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Typography } from "@mui/material"; // ✅ Import Typography from Material-UI
import ChatbotComponent from '../components/ChatBot/ChatBot'; // ✅ Ensure correct import
import ErrorBoundary from '../components/ChatBot/ErrorBoundary'; // ✅ Ensure correct import
>>>>>>> code_daan

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to different pages
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
<<<<<<< HEAD
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h1>Welcome to AgriTech Solutions</h1>
        <p>Empowering Farmers with AI-Driven Insights</p>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card" onClick={() => navigateTo("/weather")}>
          <h2>Weather Prediction</h2>
          <p>Get accurate weather forecasts and alerts for your farm.</p>
        </div>
        <div className="feature-card" onClick={() => navigateTo("/soil-health")}>
          <h2>Soil Health Monitoring</h2>
          <p>Monitor soil conditions and get recommendations for better yields.</p>
        </div>
        <div className="feature-card" onClick={() => navigateTo("/crop-advisory")}>
          <h2>Crop Advisory</h2>
          <p>Receive AI-powered advice for planting, fertilizing, and pest control.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <button onClick={() => navigateTo("/dashboard")}>Go to Dashboard</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2023 AgriTech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
=======
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
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
    </Container>
  );
};

export default Home;
<<<<<<< HEAD
=======
>>>>>>> code_daan
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
