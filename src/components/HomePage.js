import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vault Insight
          </Typography>
          <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
          <Button color="inherit" onClick={handleRegisterOpen}>Register</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box mt={12}>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Project
          </Typography>
          <Typography variant="h5" paragraph>
            Our application provides a comprehensive solution for managing financial transactions and analyzing budget data.
          </Typography>
          <Typography variant="h6" paragraph>
            Here’s what you can do:
          </Typography>
          <ul>
            <li>Manage your financial transactions and categorize them into books.</li>
            <li>Generate random transactions for testing or simulation purposes.</li>
            <li>Analyze your financial data with graphical representations and detailed tables.</li>
          </ul>
          <Box mt={4}>
            <Button
              component={Link}
              to="/books"
              variant="contained"
              color="primary"
            >
              Go to Transaction Books
            </Button>
            <Button
              component={Link}
              to="/comparatives"
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Go to Analytics
            </Button>
          </Box>
        </Box>
      </Container>
      <LoginDialog open={loginOpen} onClose={handleLoginClose} />
      <RegisterDialog open={registerOpen} onClose={handleRegisterClose} />
    </Box>
  );
};

export default HomePage;
