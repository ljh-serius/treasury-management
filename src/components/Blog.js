import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import articles from '../utils/articles'; // The manually imported articles

const Blog = () => {

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12 }}>
      <Typography variant="h4" gutterBottom>
        Blog Articles
      </Typography>
      <List>
        {articles.map((article, index) => (
          <React.Fragment key={article.slug}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/article/${article.slug}`}>
                <ListItemText primary={article.title} />
              </ListItemButton>
            </ListItem>
            {index < articles.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Blog;
