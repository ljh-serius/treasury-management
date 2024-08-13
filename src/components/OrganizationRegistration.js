import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {
  Container, Typography, TextField, Button, Box, Grid, Alert, Paper, AppBar, Toolbar
} from '@mui/material';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [numUsers, setNumUsers] = useState(1);
  const [numStores, setNumStores] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userPrice = 50; // Example price per user
  const storePrice = 100; // Example price per store
  const basePrice = 500; // Base price for the organization

  const totalPrice = basePrice + (numUsers * userPrice) + (numStores * storePrice);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Check if the organization email already exists
      const q = query(collection(db, 'organizations'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Organization with this email already exists.');
        return;
      }

      // Create the organization
      const orgRef = doc(collection(db, 'organizations'));
      const orgData = {
        name: orgName,
        email: email,
        domain: domain,
        numUsers: numUsers,
        numStores: numStores,
        price: totalPrice,
        tenant_id: orgRef.id, // Using the document ID as tenant ID
      };

      await setDoc(orgRef, orgData);

      // Redirect to the login page or another relevant page
      navigate('/');

    } catch (error) {
      console.error('Error registering organization:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vault Insight
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register Organization
        </Typography>
        <form onSubmit={handleRegister}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Organization Name"
              variant="outlined"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Organization Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Custom Domain"
              variant="outlined"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </Box>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number of Users"
                type="number"
                variant="outlined"
                value={numUsers}
                onChange={(e) => setNumUsers(parseInt(e.target.value, 10))}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number of Stores"
                type="number"
                variant="outlined"
                value={numStores}
                onChange={(e) => setNumStores(parseInt(e.target.value, 10))}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Pricing</Typography>
            <Typography>Base Price: €{basePrice}</Typography>
            <Typography>Price per User: €{userPrice}</Typography>
            <Typography>Price per Store: €{storePrice}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total Price: <strong>€{totalPrice}</strong>
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Registration;
