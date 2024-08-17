import React, { useState, useEffect } from 'react';
import { addEntityToOrganization, fetchEntities, updateEntity, deleteEntity } from '../utils/firebaseHelpers';
import {
  Container, Typography, TextField, Button, Box, Grid, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Divider, InputAdornment, useTheme
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';

const EntityManagement = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingEntity, setEditingEntity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
      if (organizationId) {
        try {
          const data = await fetchEntities(organizationId);
          setEntities(data);
        } catch (error) {
          console.error("Error fetching entities: ", error);
        }
      } else {
        setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddEntity = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      if (editingEntity) {
        // Update existing entity
        const result = await updateEntity(organizationId, editingEntity.id, { name, description });
        if (result.success) {
          setEntities(entities.map(entity => entity.id === editingEntity.id ? { ...entity, name, description } : entity));
          setSuccess('Entity updated successfully.');
        }
      } else {
        // Add new entity
        const result = await addEntityToOrganization(organizationId, { name, description });
        if (result.success) {
          setEntities([...entities, { id: result.id, name, description }]);
          setSuccess('Entity added successfully.');
        }
      }

      // Reset form fields
      setName('');
      setDescription('');
      setEditingEntity(null);
    } catch (error) {
      console.error('Error adding/updating entity:', error);
      setError('An error occurred while adding/updating the entity. Please try again.');
    }
  };

  const handleEditEntity = (entity) => {
    setName(entity.name);
    setDescription(entity.description);
    setEditingEntity(entity);
  };

  const handleDeleteEntity = async (entityId) => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    if (!organizationId) {
      setError('Invalid organization ID. Please ensure you are passing a valid organization ID.');
      return;
    }

    try {
      const result = await deleteEntity(organizationId, entityId);
      if (result.success) {
        setEntities(entities.filter(entity => entity.id !== entityId));
        setSuccess('Entity deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting entity:', error);
      setError('An error occurred while deleting the entity. Please try again.');
    }
  };

  const filteredEntities = entities.filter(
    (entity) =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleAddEntity}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Entity Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Entity Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
            />
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
          {editingEntity ? 'Update Entity' : 'Add Entity'}
        </Button>
      </form>

      <Typography variant="h5" sx={{ marginTop: 5 }} gutterBottom>
        Entities List
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search entities..."
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
      <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: '12px', boxShadow: theme.shadows[3] }}>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead sx={{ backgroundColor: theme.palette.primary.dark }}>
            <TableRow>
              <TableCell><Typography color={theme.palette.primary.contrastText}>Name</Typography></TableCell>
              <TableCell><Typography color={theme.palette.primary.contrastText}>Description</Typography></TableCell>
              <TableCell><Typography color={theme.palette.primary.contrastText}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditEntity(entity)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteEntity(entity.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EntityManagement;
