    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { auth, db } from '../utils/firebaseConfig'; // Import auth from firebaseConfig
    import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth methods
    import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
    import {
    Container, Typography, TextField, Button, Box, Grid, Alert, Paper, AppBar, Toolbar
    } from '@mui/material';
    import { v4 as uuidv4 } from 'uuid'; // Import UUID for tenant_id generation
    import { createOrganization } from '../utils/firebaseHelpers';

    const Registration = () => {
    const [orgName, setOrgName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Add a password field
    const [domain, setDomain] = useState('');
    const [numUsers, setNumUsers] = useState(1);
    const [numStores, setNumStores] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userPrice = 50; // Example price per user
    const storePrice = 100; // Example price per store
    const basePrice = 500; // Base price for the organization

    const totalPrice = basePrice + (numUsers * userPrice) + (numStores * storePrice);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
        // Check if the organization name already exists in Firestore
        const q = query(collection(db, 'organizations'), where('name', '==', orgName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setError('Organization with this name already exists.');
            return;
        }

        // Register the organization as a user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        // Create the organization in Firestore
        const { tenantId, organizationId } = await createOrganization(orgName, domain, email, numUsers, numStores, totalPrice, user.uid);

        // Retrieve organization associated with the logged-in email
        const q2 = query(collection(db, 'organizations'), where('email', '==', email));
        const querySnapshot2 = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0]; // Get the first matching organization document
            const organization = docSnapshot.data(); // Get the data of the organization
            const organizationId = docSnapshot.id; // Get the document ID (key)

            // Save both the organization data and its ID in localStorage
            localStorage.setItem('organization', JSON.stringify(organization));
            localStorage.setItem('organizationId', organizationId);
            
            console.log('Organization ID:', organizationId); // For debugging purposes
        } else {
            console.error('No organization found for this user');
        }
        // Save both the organization data and its ID in localStorage
        localStorage.setItem('organizationId', organizationId);
        
        console.log('Organization ID:', organizationId); // For debugging purposes
        console.log("organizationId", organizationId)
        // You can perform additional actions here, like redirecting to a different page
        console.log(`Organization created with ID: ${organizationId} and Tenant ID: ${tenantId}`);
        navigate('/');

        } catch (error) {
        console.error('Error registering organization:', error);
        setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Vault Insight
            </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar />
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Typography variant="h4" gutterBottom>
            Register Organization
            </Typography>
            <form onSubmit={handleRegister}>
            <Box sx={{ mb: 3 }}>
                <TextField
                fullWidth
                label="Organization Name"
                variant="outlined"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                />
            </Box>
            <Box sx={{ mb: 3 }}>
                <TextField
                fullWidth
                label="Organization Email"
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
                <TextField
                fullWidth
                label="Custom Domain"
                variant="outlined"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
                />
            </Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Number of Users"
                    type="number"
                    variant="outlined"
                    value={numUsers}
                    onChange={(e) => setNumUsers(parseInt(e.target.value, 10))}
                    inputProps={{ min: 1 }}
                    required
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Number of Stores"
                    type="number"
                    variant="outlined"
                    value={numStores}
                    onChange={(e) => setNumStores(parseInt(e.target.value, 10))}
                    inputProps={{ min: 1 }}
                    required
                />
                </Grid>
            </Grid>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Pricing</Typography>
                <Typography>Base Price: €{basePrice}</Typography>
                <Typography>Price per User: €{userPrice}</Typography>
                <Typography>Price per Store: €{storePrice}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                Total Price: <strong>€{totalPrice}</strong>
                </Typography>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                {error}
                </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
            </form>
        </Paper>
        </Container>
    );
    };

    export default Registration;
