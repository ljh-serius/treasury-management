import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import {
  Container, Typography, TextField, Button, Box, Grid, Alert, Paper, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Divider, InputAdornment, useTheme
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { addUser } from '../utils/firebaseHelpers';

const ManageUsers = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('store');
  const [entityId, setEntityId] = useState('');
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();

  useEffect(() => {
    fetchUsers();
    fetchEntities();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const organizationId = userData.organizationId;

      if (!organizationId) {
        setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
        setLoading(false);
        return;
      }

      const usersCollectionRef = collection(db, 'users');
      const usersQuery = query(usersCollectionRef, where('organizationId', '==', organizationId));
      const usersSnapshot = await getDocs(usersQuery);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users.');
    }
    setLoading(false);
  };

  const fetchEntities = async () => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      const entitiesCollectionRef = collection(db, 'organizations', organizationId, 'entities');
      const entitiesSnapshot = await getDocs(entitiesCollectionRef);
      const entitiesList = entitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntities(entitiesList);
    } catch (error) {
      console.error('Error fetching entities:', error);
      setError('An error occurred while fetching entities.');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      if (editingUser) {
        const userDocRef = doc(db, 'users', editingUser.id);
        await setDoc(userDocRef, {
          firstName,
          lastName,
          email,
          role,
          entityId: role === 'store' ? entityId : null,
          uid: editingUser.uid,
          createdAt: editingUser.createdAt,
          organizationId,  // Ensure the organizationId is updated
        });
        setSuccess(`User ${firstName} ${lastName} updated successfully as ${role}`);
        setEditingUser(null);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        addUser(user.uid, firstName, lastName, email, role, organizationId, entityId);

        setSuccess(`User ${firstName} ${lastName} added successfully as ${role}`);
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('store');
      setEntityId('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding/updating user:', error);
      setError('An error occurred while adding/updating the user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setSuccess('User deleted successfully.');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An error occurred while deleting the user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setRole(user.role);
    setEntityId(user.entityId || '');
    setEditingUser(user);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
}}>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleAddUser}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="User Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {!editingUser && (
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}>
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

          {role === 'store' && (
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}>
                <InputLabel id="entity-label">Entity</InputLabel>
                <Select
                  labelId="entity-label"
                  value={entityId}
                  label="Entity"
                  onChange={(e) => setEntityId(e.target.value)}
                  required
                >
                  {entities.map((entity) => (
                    <MenuItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
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

      <Typography variant="h5" sx={{ marginTop: 5 }} gutterBottom >
        Users List
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
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
        <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: '12px', boxShadow: theme.shadows[3] }}>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead sx={{ backgroundColor: theme.palette.primary.dark }}>
              <TableRow>
                <TableCell><Typography color={theme.palette.primary.contrastText}>First Name</Typography></TableCell>
                <TableCell><Typography color={theme.palette.primary.contrastText}>Last Name</Typography></TableCell>
                <TableCell><Typography color={theme.palette.primary.contrastText}>Email</Typography></TableCell>
                <TableCell><Typography color={theme.palette.primary.contrastText}>Role</Typography></TableCell>
                <TableCell><Typography color={theme.palette.primary.contrastText}>Entity</Typography></TableCell>
                <TableCell><Typography color={theme.palette.primary.contrastText}>Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{entities.find(entity => entity.id === user.entityId)?.name || 'N/A'}</TableCell>
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
