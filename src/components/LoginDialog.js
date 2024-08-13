// src/components/LoginDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../utils/firebaseConfig'; // Import Firestore instance

const LoginDialog = ({ open, onClose }) => { // Add onLoginSuccess prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Retrieve organization associated with the logged-in email
      const q = query(collection(db, 'organizations'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]; // Get the first matching organization document
        const organization = docSnapshot.data(); // Get the data of the organization
        const organizationId = docSnapshot.id; // Get the document ID (key)

        // Save both the organization data and its ID in localStorage
        localStorage.setItem('organization', JSON.stringify(organization));
        localStorage.setItem('organizationId', organizationId);
        
        console.log('Organization ID:', organizationId); // For debugging purposes
      } else {
        console.error('No organization found for this user');
      }

      onClose(); // Close dialog on successful login
    } catch (error) {
      setError(error.message);
    }
  };  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your email address and password to log in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
