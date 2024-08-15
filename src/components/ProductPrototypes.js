import React, { useState } from 'react';
import { Container, Typography, Button, Paper, TextField, List, ListItem, ListItemText } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const ProductPrototypes = () => {
  const [prototypeName, setPrototypeName] = useState('');
  const [prototypeDescription, setPrototypeDescription] = useState('');
  const [prototypes, setPrototypes] = useState([]);

  const fetchPrototypes = async () => {
    const querySnapshot = await getDocs(collection(db, 'prototypes'));
    const prototypesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPrototypes(prototypesData);
  };

  const handleAddPrototype = async () => {
    try {
      await addDoc(collection(db, 'prototypes'), {
        name: prototypeName,
        description: prototypeDescription,
      });
      setPrototypeName('');
      setPrototypeDescription('');
      fetchPrototypes();
    } catch (error) {
      console.error('Error adding prototype:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product Prototypes
      </Typography>
      <Paper style={{ padding: '20px' }}>
        <TextField
          label="Prototype Name"
          fullWidth
          value={prototypeName}
          onChange={(e) => setPrototypeName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Prototype Description"
          multiline
          rows={4}
          fullWidth
          value={prototypeDescription}
          onChange={(e) => setPrototypeDescription(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddPrototype}>
          Add Prototype
        </Button>
      </Paper>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Existing Prototypes
      </Typography>
      <Paper>
        <List>
          {prototypes.map(prototype => (
            <ListItem key={prototype.id}>
              <ListItemText primary={prototype.name} secondary={prototype.description} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProductPrototypes;
