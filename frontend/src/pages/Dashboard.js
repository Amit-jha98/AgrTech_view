import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import { WbSunny, Opacity, Air, Refresh, LocalFlorist, Assignment } from '@mui/icons-material';
import { getWeather } from '../services/weather';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultLocation = "Patna";

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await getWeather(defaultLocation);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 4,
      background: 'linear-gradient(to right bottom, #f1f8e9, #f9fbe7)',
      minHeight: '100vh'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#2e7d32',
          fontWeight: 600,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        Farmer's Dashboard
        <IconButton onClick={fetchWeatherData} color="primary">
          <Refresh />
        </IconButton>
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center', 
            minHeight: '200px',
            borderRadius: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 3
            }
          }}>
            <Typography variant="h6" sx={{ color: '#1b5e20', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <WbSunny /> Weather Forecast
            </Typography>
            {loading ? (
              <CircularProgress sx={{ mt: 4 }} />
            ) : error ? (
              <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            ) : weatherData?.current ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h3" sx={{ color: '#33691e', mb: 1 }}>
                  {weatherData.current.current.temp_c}°C
                </Typography>
                <Typography variant="h6" sx={{ color: '#558b2f', mb: 2 }}>
                  {weatherData.current.current.condition.text}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Opacity fontSize="small" /> {weatherData.current.current.humidity}%
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Air fontSize="small" /> {weatherData.current.current.wind_kph} km/h
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography>No weather data available</Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center',
            borderRadius: 2,
            minHeight: '200px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 3
            }
          }}>
            <Typography variant="h6" sx={{ color: '#1b5e20', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <LocalFlorist /> Soil Health
            </Typography>
            <Typography variant="h5" sx={{ color: '#33691e', mt: 4 }}>Good Condition</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center',
            borderRadius: 2,
            minHeight: '200px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 3
            }
          }}>
            <Typography variant="h6" sx={{ color: '#1b5e20', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Assignment /> Next Steps
            </Typography>
            <Typography variant="h5" sx={{ color: '#33691e', mt: 4 }}>Time to fertilize</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;