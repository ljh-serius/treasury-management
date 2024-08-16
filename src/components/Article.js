import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from '../utils/articles'; // Import the articles
import { Container, CardContent, Typography, Button } from '@mui/material';

const Article = ({ language, switchLanguage }) => {
    const { slug } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        const article = articles.find((article) => article.slug === slug);
        if (article) {
            setContent(article.content[language] || ''); // Default to empty string if content is undefined
        }
    }, [slug, language]);

    const formattedContent = content.split('\n').map((line, index) => {
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)[0].length; // Get the number of leading #
            const text = line.replace(/^#+\s*/, ''); // Remove the leading # and any space
            const headingLevel = `h${level}`;

            return (
            <Typography
                key={index}
                variant={headingLevel}
                style={{ marginTop: '16px' }}
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
    <Container maxWidth="lg"  sx={{ mt: 12, mb: 12 }}>
        <Button onClick={() => switchLanguage('en')}>English</Button>
        <Button onClick={() => switchLanguage('fr')}>Français</Button>
        <CardContent>
        {formattedContent}
        </CardContent>
    </Container>
    );
};

export default Article;
