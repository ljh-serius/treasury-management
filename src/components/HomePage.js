import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
