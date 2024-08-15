import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const RiskManagement = () => {
  const [risks, setRisks] = useState([]);
  const [newRisk, setNewRisk] = useState('');

  useEffect(() => {
    const fetchRisks = async () => {
      const querySnapshot = await getDocs(collection(db, 'risks'));
      const risksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRisks(risksData);
    };

    fetchRisks();
  }, []);

  const handleRiskChange = async (riskId, description) => {
    const riskRef = doc(db, 'risks', riskId);
    await updateDoc(riskRef, { description });
    setRisks(risks.map(risk => (risk.id === riskId ? { ...risk, description } : risk)));
  };

  const handleAddRisk = async () => {
    try {
      await addDoc(collection(db, 'risks'), { description: newRisk });
      setNewRisk('');
      // Fetch the updated risks
      const querySnapshot = await getDocs(collection(db, 'risks'));
      setRisks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error adding risk:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Risk Management
      </Typography>
      <Paper>
        <List>
          {risks.map(risk => (
            <ListItem key={risk.id}>
              <TextField
                label="Risk Description"
                fullWidth
                value={risk.description}
                onChange={(e) => handleRiskChange(risk.id, e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <TextField
        label="New Risk"
        fullWidth
        value={newRisk}
        onChange={(e) => setNewRisk(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddRisk} style={{ marginTop: '20px' }}>
        Add Risk
      </Button>
    </Container>
  );
};

export default RiskManagement;
