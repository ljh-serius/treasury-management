import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const ProjectPrioritization = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handlePriorityChange = async (projectId, priority) => {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, { priority });
    setProjects(projects.map(project => (project.id === projectId ? { ...project, priority } : project)));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Project Prioritization and Time Allocation
      </Typography>
      <Paper>
        <List>
          {projects.map(project => (
            <ListItem key={project.id}>
              <ListItemText primary={project.name} secondary={`Priority: ${project.priority}`} />
              <TextField
                label="Priority"
                type="number"
                value={project.priority}
                onChange={(e) => handlePriorityChange(project.id, e.target.value)}
                variant="outlined"
                margin="normal"
                style={{ width: '100px' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Save Priorities
      </Button>
    </Container>
  );
};

export default ProjectPrioritization;
