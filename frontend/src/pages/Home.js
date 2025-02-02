import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import CSS for styling

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to different pages
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
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