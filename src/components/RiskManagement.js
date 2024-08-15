import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, List, ListItem, TextField, Button, MenuItem, Select, FormControl,
  InputLabel, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const RiskManagement = () => {
  const [risks, setRisks] = useState([]);
  const [newRisk, setNewRisk] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newStatus, setNewStatus] = useState('Identified');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState(null);

  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    const querySnapshot = await getDocs(collection(db, 'risks'));
    const risksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRisks(risksData);
  };

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
      fetchRisks();
    } catch (error) {
      console.error('Error adding risk:', error);
    }
  };

  const handleDeleteRisk = async (riskId) => {
    try {
      await deleteDoc(doc(db, 'risks', riskId));
      setRisks(risks.filter(risk => risk.id !== riskId));
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  const handleEditClick = (risk) => {
    setSelectedRisk(risk);
    setNewRisk(risk.description);
    setNewPriority(risk.priority);
    setNewStatus(risk.status);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRisk(null);
    setNewRisk('');
    setNewPriority('Medium');
    setNewStatus('Identified');
  };

  const handleUpdateRisk = async () => {
    if (selectedRisk) {
      const riskRef = doc(db, 'risks', selectedRisk.id);
      await updateDoc(riskRef, { description: newRisk, priority: newPriority, status: newStatus });
      fetchRisks();
      handleDialogClose();
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Risk Management
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add New Risk
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Risk Description"
              fullWidth
              value={newRisk}
              onChange={(e) => setNewRisk(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          </Grid>
          <Grid item xs={12} sm={3}>
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
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRisk}
          startIcon={<AddIcon />}
          style={{ marginTop: '20px' }}
        >
          Add Risk
        </Button>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Risk List
        </Typography>
        <List>
          {risks.map(risk => (
            <ListItem key={risk.id} divider>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">{risk.description}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography variant="body2">Priority: {risk.priority}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography variant="body2">Status: {risk.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton color="primary" onClick={() => handleEditClick(risk)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteRisk(risk.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Risk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the details of the selected risk.
          </DialogContentText>
          <TextField
            label="Risk Description"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRisk} color="primary" variant="contained">
            Update Risk
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RiskManagement;
