import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { Container, Paper, Typography, TextField, Button, Box, Grid, CircularProgress, Alert } from '@mui/material';

const ManageOrganization = () => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      console.log("Fetching organization data...");
      try {
        const organizationId = localStorage.getItem("organizationId");
        if (!organizationId) {
          console.error("organizationId is null or undefined");
          setLoading(false);
          setError('Invalid organization ID.');
          return;
        }
        const orgDocRef = doc(db, 'organizations', organizationId);
        const orgDoc = await getDoc(orgDocRef);
        if (orgDoc.exists()) {
          console.log("Organization data:", orgDoc.data());
          setOrganization(orgDoc.data());
        } else {
          console.error("Organization not found");
          setError('Organization not found');
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
        setError('An error occurred while fetching the organization.');
      } finally {
        setLoading(false);
        console.log("Finished loading");
      }
    };
  
    fetchOrganization();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleUpdateOrganization = async () => {
    setError(null);
    setSuccess(null);
    try {
      const organizationId = localStorage.getItem("organizationId");
      if (!organizationId) {
        setError('Invalid organization ID.');
        return;
      }
      const orgDocRef = doc(db, 'organizations', organizationId);
      await updateDoc(orgDocRef, organization);
      setSuccess('Organization updated successfully');
    } catch (error) {
      console.error('Error updating organization:', error);
      setError('An error occurred while updating the organization.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization Name"
                name="name"
                variant="outlined"
                value={organization?.name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization Address"
                name="address"
                variant="outlined"
                value={organization?.address || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization Email"
                name="email"
                variant="outlined"
                value={organization?.email || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Transaction Summary Limit"
                name="transactionSummaryLimit"
                type="number"
                variant="outlined"
                value={organization?.transactionSummaryLimit || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Limit"
                name="userLimit"
                type="number"
                variant="outlined"
                value={organization?.numUsers || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Store Limit"
                name="storeLimit"
                type="number"
                variant="outlined"
                value={organization?.numStores || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          {success && (
            <Alert severity="success" sx={{ mt: 3 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleUpdateOrganization}
          >
            Update Organization
          </Button>
        </Box>
    </Container>
  );
};

export default ManageOrganization;
