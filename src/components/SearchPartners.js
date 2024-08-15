import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const SearchPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    const q = query(collection(db, 'partners'), where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    const partnersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPartners(partnersData);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchPartners();
    }
  }, [searchTerm]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Search Partners
      </Typography>
      <TextField
        label="Search by Name"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Paper>
        <List>
          {partners.map(partner => (
            <ListItem key={partner.id}>
              <ListItemText primary={partner.name} secondary={`Service: ${partner.service}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default SearchPartners;
