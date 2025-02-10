import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import SoilHealth from './pages/SoilHealth';
import CropAdvisory from './pages/CropAdvisory';
import Marketplace from './pages/Marketplace';
import "bootstrap/dist/css/bootstrap.min.css";
import { logVisit } from './services/visitorService';

const App = () => {
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit) {
      logVisit().then(() => {
        localStorage.setItem('hasVisited', 'true');
      });
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/soil-health" element={<SoilHealth />} />
          <Route path="/crop-advisory" element={<CropAdvisory />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
