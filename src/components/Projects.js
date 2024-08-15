import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Paper>
        <List>
          {projects.map(project => (
            <ListItem key={project.id}>
              <ListItemText primary={project.name} secondary={`Status: ${project.status}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Add New Project
      </Button>
    </Container>
  );
};

export default Projects;
