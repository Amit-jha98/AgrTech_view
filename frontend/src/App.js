<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from 'react';
=======

>>>>>>> code_daan
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import SoilHealth from './pages/SoilHealth';
import CropAdvisory from './pages/CropAdvisory';
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { logVisit } from './services/visitorService';
import React, { useEffect } from 'react'; 
import Marketplace from './pages/Marketplace';


=======
<<<<<<< HEAD

const App = () => {
=======
import { logVisit } from './services/visitorService';
import React, { useEffect } from 'react'; 
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758


const App = () => {

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit) {
      logVisit().then(() => {
        localStorage.setItem('hasVisited', 'true');
      });
    }
  }, []);

<<<<<<< HEAD
=======
>>>>>>> code_daan
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
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
<<<<<<< HEAD
          <Route path="/marketplace" element={<Marketplace />} />
=======
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
        </Routes>
      </Container>
    </Box>
  );
};

<<<<<<< HEAD
export default App;

=======
export default App;
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
