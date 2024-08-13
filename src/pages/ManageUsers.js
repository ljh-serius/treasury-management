import React, { useState } from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, or } from 'firebase/firestore';
import {
  Container, Typography, TextField, Button, Box, Grid, Alert, Paper, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

const ManageUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Optionally generate or require a password
  const [role, setRole] = useState('store'); // Default role
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const organizationId = localStorage.getItem('organizationId');

    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      // Register the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details under the organization's collection
      const userDocRef = doc(collection(db, 'organizations', organizationId, 'users'), user.uid);
      await setDoc(userDocRef, {
        email: email,
        role: role, // 'store' or 'headquarter'
        uid: user.uid,
        createdAt: new Date(),
      });

      setSuccess(`User ${email} added successfully as ${role}`);
      setEmail('');
      setPassword(''); // Clear password if you are using it manually
      setRole('store'); // Reset role to default

    } catch (error) {
      console.error('Error adding user:', error);
      setError('An error occurred while adding the user. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <form onSubmit={handleAddUser}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="User Email"
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
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="store">Store Level</MenuItem>
                <MenuItem value="headquarter">Headquarter</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add User
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ManageUsers;
