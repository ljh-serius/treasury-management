import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const CostOptimization = () => {
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');

  const handleOptimization = async () => {
    try {
      await addDoc(collection(db, 'costOptimization'), {
        cost: parseFloat(cost),
        description,
      });
      setCost('');
      setDescription('');
    } catch (error) {
      console.error('Error optimizing cost:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Cost Optimization and Allocation
      </Typography>
      <Paper style={{ padding: '20px' }}>
        <TextField
          label="Cost"
          fullWidth
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          variant="outlined"
          margin="normal"
          type="number"
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleOptimization}>
          Optimize
        </Button>
      </Paper>
    </Container>
  );
};

export default CostOptimization;
