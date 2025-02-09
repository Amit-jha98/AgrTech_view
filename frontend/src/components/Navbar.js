import React from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Agriculture Platform
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
=======
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          Agriculture Platform
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
            
            <NavDropdown title="Shortcuts" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/weather')}>
                Weather Forecast
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/crop-advisory')}>
                Crop Management
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/soil-health')}>
                Soil Analysis
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item onClick={() => navigate('/Dashboard')}>
                Dashboard
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
<<<<<<< HEAD
=======
>>>>>>> code_daan
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
