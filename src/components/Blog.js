import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import articles from '../utils/articles'; // The manually imported articles

const Blog = ({ language, switchLanguage }) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12 }}>
      <Button onClick={() => switchLanguage('en')}>English</Button>
      <Button onClick={() => switchLanguage('fr')}>Français</Button>
      <Typography variant="h4" gutterBottom>
        {language === 'en' ? 'Blog Articles' : 'Articles du Blog'}
      </Typography>
      <List>
        {articles.map((article, index) => (
          <React.Fragment key={article.slug}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/article/${article.slug}`}>
                <ListItemText primary={article.title[language]} />
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
