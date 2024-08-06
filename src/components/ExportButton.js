import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

const ExportButton = ({ exportToSpreadsheet }) => {
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [token, setToken] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [error, setError] = useState('');

  const handleOpen = async () => {
    const response = await axios.post('https://localhost:5000/create-payment-intent', {
      email: 'customer@example.com',
      phone: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
    });

    setClientSecret(response.data.clientSecret);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePaymentSuccess = async (paymentIntentId) => {
    setPaymentIntentId(paymentIntentId);
  };

  const handleConfirm = async () => {
    const response = await axios.post('/subscribe', { paymentIntentId });

    if (response.data.token) {
      setToken(response.data.token);
      exportToSpreadsheet();
      handleClose();
    } else {
      setError('Failed to validate token');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Export as Spreadsheet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          {clientSecret ? (
            <Elements stripe={stripePromise}>
              <PaymentForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
            </Elements>
          ) : (
            <DialogContentText>Loading payment form...</DialogContentText>
          )}
        </DialogContent>
        {paymentIntentId && (
          <>
            <DialogTitle>Enter Subscription Token</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To export the data, please enter your subscription token.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Token"
                fullWidth
                variant="standard"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                error={!!error}
                helperText={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ExportButton;
