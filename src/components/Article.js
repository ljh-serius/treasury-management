import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from '../utils/articles'; // Import the articles
import { Container, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
  
const StyledCard = styled(Card)(({ theme }) => ({
margin: '16px',
width: '100%',
[theme.breakpoints.up('md')]: {
    maxWidth: '65%',
},
[theme.breakpoints.down('md')]: {
    maxWidth: '80%',
},
'@media print': {
    margin: '0',
    width: '100%',
    maxWidth: '100%',
},
}));

const headingStyles = {
    h1: { fontSize: '31.2px', fontWeight: 'bold' },
    h2: { fontSize: '25.2px', fontWeight: 'bold' },
    h3: { fontSize: '21.6px', fontWeight: 'bold' },
    h4: { fontSize: '18px', fontWeight: 'bold' },
    h5: { fontSize: '14.4px', fontWeight: 'bold' },
    h6: { fontSize: '12px', fontWeight: 'bold' },
};
  
const ArticleCard = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');
  
    useEffect(() => {
      const article = articles.find((article) => article.slug === slug);
      if (article) {
        setContent(article.content || ''); // Default to empty string if content is undefined
      }
    }, [])

    const formattedContent = content.split('\n').map((line, index) => {
    if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length; // Get the number of leading #
        const text = line.replace(/^#+\s*/, ''); // Remove the leading # and any space
        const headingLevel = `h${level}`;

        return (
        <Typography
            key={index}
            variant={headingLevel}
            style={{ ...headingStyles[headingLevel], marginTop: '16px' }}
        >
            {text}
        </Typography>
        );
    }

    // Handle bold text (Markdown syntax **text**)
    const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return (
        <Typography
        key={index}
        variant="body2"
        color="textSecondary"
        component="p"
        dangerouslySetInnerHTML={{ __html: boldText }}
        style={{ marginTop: '8px' }}
        />
    );
    });

    return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12 }}>
        <CardContent>
        {formattedContent}
        </CardContent>
    </Container>
    );
};

export default ArticleCard;
  