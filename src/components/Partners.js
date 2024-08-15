import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const querySnapshot = await getDocs(collection(db, 'partners'));
      const partnersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPartners(partnersData);
    };

    fetchPartners();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Partners and Their Offers
      </Typography>
      <Paper>
        <List>
          {partners.map(partner => (
            <ListItem key={partner.id}>
              <ListItemText primary={partner.name} secondary={`Service: ${partner.service}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Add New Partner
      </Button>
    </Container>
  );
};

export default Partners;
