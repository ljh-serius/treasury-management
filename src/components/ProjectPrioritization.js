import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const ProjectPrioritization = () => {
  const [projects, setProjects] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch projects from Firestore when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle changes to priority for a specific project
  const handlePriorityChange = (projectId, priority) => {
    setProjects(projects.map(project => (project.id === projectId ? { ...project, priority: parseInt(priority, 10) || 0 } : project)));
  };

  // Save updated priorities to Firestore
  const handleSavePriorities = async () => {
    setIsSaving(true);
    try {
      // Update each project document in Firestore
      await Promise.all(projects.map(project => {
        const projectRef = doc(db, 'projects', project.id);
        return updateDoc(projectRef, { priority: project.priority });
      }));
      alert('Priorities saved successfully!');
    } catch (error) {
      console.error('Error saving priorities:', error);
      alert('Failed to save priorities.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Project Prioritization and Time Allocation
      </Typography>
      <Paper style={{ padding: '20px' }}>
        <List>
          {projects.map(project => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.name}
                secondary={`Current Priority: ${project.priority}`}
              />
              <TextField
                label="Priority"
                type="number"
                value={project.priority || ''}
                onChange={(e) => handlePriorityChange(project.id, e.target.value)}
                variant="outlined"
                margin="normal"
                style={{ width: '100px' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePriorities}
        style={{ marginTop: '20px' }}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Priorities'}
      </Button>
    </Container>
  );
};

export default ProjectPrioritization;
