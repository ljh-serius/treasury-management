import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { auth, db } from '../../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Container, Typography, TextField, Button, Box, Grid, Alert, Paper, AppBar, Toolbar } from '@mui/material';
import { createOrganization, addUser } from '../../utils/authHelpers';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Import the confirmation modal component

const OrganizationRegistration = () => {
  const [orgName, setOrgName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [numUsers, setNumUsers] = useState(1);
  const [numStores, setNumStores] = useState(1);
  const [error, setError] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation modal

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const userPrice = 50;
  const storePrice = 100;
  const basePrice = 500;
  const totalPrice = basePrice + (numUsers * userPrice) + (numStores * storePrice);

  const handlePayment = async () => {
    try {
      const response = await fetch('https://us-central1-vault-insight.cloudfunctions.net/createPaymentIntent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice, currency: 'usd' }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setError(`Payment failed: ${result.error.message}`);
        return false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
          return true;
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      setError('An error occurred during payment. Please try again.');
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const q = query(collection(db, 'organizations'), where('name', '==', orgName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Organization with this name already exists.');
        return;
      }

      const paymentSuccess = await handlePayment();
      if (!paymentSuccess) {
        return;
      }

      const organizationCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const organization = organizationCredentials.user;
    
      const { tenantId, organizationId } = await createOrganization(orgName, domain, email, numUsers, numStores, totalPrice, organization.uid);

      await addUser(organization.uid, firstName, lastName, email, 'admin', organizationId, null);

      setConfirmationOpen(true); // Open the confirmation modal

    } catch (error) {
      console.error('Error registering organization:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  const handleConfirm = () => {
    setConfirmationOpen(false); // Close the modal
    navigate('/'); // Redirect to the homepage
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
              label="First Name"   // Added first name input
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Last Name"   // Added last name input
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Payment Information</Typography>
            <CardElement />
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
      <ConfirmationModal open={confirmationOpen} onClose={handleConfirm} onConfirm={handleConfirm} />
    </Container>
  );
};


export default OrganizationRegistration;
