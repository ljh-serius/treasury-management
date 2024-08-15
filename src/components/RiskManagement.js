import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const RiskManagement = () => {
  const [risks, setRisks] = useState([]);
  const [newRisk, setNewRisk] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newStatus, setNewStatus] = useState('Identified');

  useEffect(() => {
    const fetchRisks = async () => {
      const querySnapshot = await getDocs(collection(db, 'risks'));
      const risksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRisks(risksData);
    };

    fetchRisks();
  }, []);

  const handleRiskChange = async (riskId, field, value) => {
    const riskRef = doc(db, 'risks', riskId);
    await updateDoc(riskRef, { [field]: value });
    setRisks(risks.map(risk => (risk.id === riskId ? { ...risk, [field]: value } : risk)));
  };

  const handleAddRisk = async () => {
    try {
      await addDoc(collection(db, 'risks'), { description: newRisk, priority: newPriority, status: newStatus });
      setNewRisk('');
      setNewPriority('Medium');
      setNewStatus('Identified');
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
                onChange={(e) => handleRiskChange(risk.id, 'description', e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={risk.priority}
                  onChange={(e) => handleRiskChange(risk.id, 'priority', e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={risk.status}
                  onChange={(e) => handleRiskChange(risk.id, 'status', e.target.value)}
                  label="Status"
                >
                  <MenuItem value="Identified">Identified</MenuItem>
                  <MenuItem value="Mitigated">Mitigated</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
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
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          label="Priority"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Identified">Identified</MenuItem>
          <MenuItem value="Mitigated">Mitigated</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddRisk} style={{ marginTop: '20px' }}>
        Add Risk
      </Button>
    </Container>
  );
};

export default RiskManagement;
