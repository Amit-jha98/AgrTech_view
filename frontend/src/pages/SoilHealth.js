<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Grid, LinearProgress, Button } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// ErrorBoundary for chart errors
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chart Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h6" color="error">
          Data visualization unavailable. Please try refreshing.
        </Typography>
      );
    }
    return this.props.children;
  }
}

const SoilHealth = () => {
  const [sensorData, setSensorData] = useState({
    moisture: 0,
    humidity: 0,
    temperature: 0,
    pH: 0,
    nutrients: { N: 0, P: 0, K: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);

  const fetchSensorData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sensor-data");
      const data = response.data;

      // Validate data structure
      if (
        !data ||
        typeof data.moisture !== 'number' ||
        typeof data.humidity !== 'number' ||
        typeof data.temperature !== 'number'
      ) {
        throw new Error('Invalid sensor data format');
      }

      const newDataPoint = {
        moisture: Number(data.moisture.toFixed(1)),
        humidity: Number(data.humidity.toFixed(1)),
        temperature: Number(data.temperature.toFixed(1)),
        timestamp: new Date(data.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setSensorData({
        ...newDataPoint,
        pH: Number(data.pH?.toFixed(1)) || 0,
        nutrients: data.nutrients || { N: 0, P: 0, K: 0 }
      });

      setHistoryData(prev => {
        const newData = [...prev, newDataPoint];
        return newData.slice(-10); // Keep last 10 data points
      });
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  const getStatusColor = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return percentage > 75 ? '#4CAF50' : percentage > 40 ? '#FFC107' : '#F44336';
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        width: 'max-content'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}
      >
        Real-time Soil Health Monitor
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 3,
          background: 'linear-gradient(45deg, #21d4fd, #b721ff)',
          boxShadow: '0 3px 5px 2px rgba(33, 212, 253, .3)'
        }}
        onClick={fetchSensorData}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </Button>

      {loading ? (
        <LinearProgress sx={{ backgroundColor: '#444' }} />
      ) : (
        <Grid container spacing={3}>
          {/* Chart Section */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                height: 300,
                minWidth: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <ErrorBoundary>
                {historyData.length > 0 ? (
                  <LineChart
                    width={800}
                    height={300}
                    data={historyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                    <XAxis
                      dataKey="timestamp"
                      tick={{ fontSize: 12, fill: '#e0e0e0' }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#e0e0e0' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: 8 }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ color: '#e0e0e0' }} />
                    <Line
                      type="monotone"
                      dataKey="moisture"
                      stroke="#21d4fd"
                      dot={false}
                      name="Moisture (%)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#b721ff"
                      dot={false}
                      name="Humidity (%)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#ff7300"
                      dot={false}
                      name="Temperature (°C)"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : (
                  <Typography variant="body1">
                    No sensor data available
                  </Typography>
                )}
              </ErrorBoundary>
            </Paper>
          </Grid>

          {/* Right-hand side: Current Readings and Nutrient Levels */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Current Readings
              </Typography>
              <Grid container spacing={2}>
                {['moisture', 'humidity', 'temperature', 'pH'].map(metric => (
                  <Grid item xs={6} key={metric}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderLeft: `4px solid ${getStatusColor(
                          sensorData[metric],
                          metric === 'pH' ? 0 : 0,
                          metric === 'pH' ? 14 : 100
                        )}`,
                        borderRadius: 1,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </Typography>
                      <Typography variant="h5">
                        {sensorData[metric].toFixed(1)}
                        {metric === 'temperature' ? '°C' : '%'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Paper
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Nutrient Levels (ppm)
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(sensorData.nutrients).map(([nutrient, value]) => (
                  <Grid item xs={4} key={nutrient}>
                    <Box
                      sx={{
                        backgroundColor: getStatusColor(value, 0, 20),
                        color: '#fff',
                        p: 2,
                        borderRadius: 1,
                        textAlign: 'center',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Typography variant="subtitle1">{nutrient}</Typography>
                      <Typography variant="h5">{value.toFixed(1)}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
=======
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const SoilHealth = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Soil Health Monitor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">pH Level</Typography>
            <Typography>6.5 (Optimal)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Moisture</Typography>
            <Typography>65% (Good)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Nutrients</Typography>
            <Typography>NPK: 14-14-14</Typography>
          </Paper>
        </Grid>
      </Grid>
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
    </Box>
  );
};

<<<<<<< HEAD
export default SoilHealth;
=======
export default SoilHealth;
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
