import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios'; // For making API calls

const EmailValidation = () => {
  const [emailContent, setEmailContent] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleEmailChange = (event) => {
    setEmailContent(event.target.value);
  };

  const validateEmail = async () => {
    try {
      const response = await axios.post('/validate-email', { content: emailContent });
      setValidationResult(response.data);
    } catch (error) {
      console.error('Error validating email:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Write and Validate Email
      </Typography>
      <Paper style={{ padding: '20px' }}>
        <TextField
          label="Email Content"
          multiline
          rows={6}
          fullWidth
          value={emailContent}
          onChange={handleEmailChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={validateEmail}>
          Validate Email
        </Button>
        {validationResult && (
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
            {validationResult.message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default EmailValidation;
