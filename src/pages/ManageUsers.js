import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import {
  Container, Typography, TextField, Button, Box, Grid, Alert, Paper, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Divider, InputAdornment
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';

const ManageUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Optionally generate or require a password
  const [role, setRole] = useState('store'); // Default role
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const organizationId = localStorage.getItem('organizationId');
    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    setLoading(true);
    try {
      const usersCollectionRef = collection(db, 'organizations', organizationId, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users.');
    }
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const organizationId = localStorage.getItem('organizationId');

    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      if (editingUser) {
        // Editing existing user
        const userDocRef = doc(db, 'organizations', organizationId, 'users', editingUser.id);
        await setDoc(userDocRef, {
          email: email,
          role: role,
          uid: editingUser.uid,
          createdAt: editingUser.createdAt,
        });
        setSuccess(`User ${email} updated successfully as ${role}`);
        setEditingUser(null);
      } else {
        // Register the user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details under the organization's collection
        const userDocRef = doc(collection(db, 'organizations', organizationId, 'users'), user.uid);
        await setDoc(userDocRef, {
          email: email,
          role: role, // 'store' or 'headquarter'
          uid: user.uid,
          createdAt: new Date(),
        });

        setSuccess(`User ${email} added successfully as ${role}`);
      }

      setEmail('');
      setPassword(''); // Clear password if you are using it manually
      setRole('store'); // Reset role to default
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error adding/updating user:', error);
      setError('An error occurred while adding/updating the user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    const organizationId = localStorage.getItem('organizationId');
    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'organizations', organizationId, 'users', userId));
      setSuccess('User deleted successfully.');
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An error occurred while deleting the user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setEmail(user.email);
    setRole(user.role);
    setEditingUser(user);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Manage Users
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleAddUser}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="User Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {!editingUser && (
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ backgroundColor: '#fff', borderRadius: '4px' }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="store">Store Level</MenuItem>
                <MenuItem value="headquarter">Headquarter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ p: 1.5, fontWeight: 'bold' }}
        >
          {editingUser ? 'Update User' : 'Add User'}
        </Button>
      </form>

        <Typography variant="h5" sx={{ marginTop: 5 }} gutterBottom color="primary">
          Users List
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3, backgroundColor: '#fff', borderRadius: '4px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Role</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditUser(user)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user.id)} color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </Container>
  );
};

export default ManageUsers;
