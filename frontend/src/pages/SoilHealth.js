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
    </Box>
  );
};

export default SoilHealth;