import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const ProductLineAssessment = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product Line Assessment
      </Typography>
      <Paper>
        <List>
          {products.map(product => (
            <ListItem key={product.id}>
              <ListItemText primary={product.name} secondary={`Category: ${product.category}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Add New Product
      </Button>
    </Container>
  );
};

export default ProductLineAssessment;
