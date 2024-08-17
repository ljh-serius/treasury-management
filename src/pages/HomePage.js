import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, Container, Grid, Paper, Card, CardContent, CardMedia,
  Avatar, Stack, Rating, Divider, List, ListItem, ListItemIcon, ListItemText, Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarsIcon from '@mui/icons-material/Stars';
import BusinessIcon from '@mui/icons-material/Business';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VerifiedIcon from '@mui/icons-material/Verified';
import LoginDialog from '../components/LoginDialog';
import RegisterDialog from '../components/RegisterDialog';
import logo from '../vault-insight-logo.png';

const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vault Insight
          </Typography>
          <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
          <Button component={Link} to="/registration" color="inherit">Register</Button> {/* Add Register button */}
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 10 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Secure. Reliable. Insightful.
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                Transform the way you manage your financial transactions with Vault Insight - the ultimate solution for businesses of all sizes.
              </Typography>
              <Button component={Link} to="/registration" variant="contained" color="primary" size="large">
                Get Started
              </Button> {/* Update to navigate to the registration route */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="500"
                  image={logo}
                  alt="Vault Insight"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Powerful Features to Boost Your Business
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3 }}>
                <SecurityIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  Secure Data Management
                </Typography>
                <Typography>
                  Your financial data is protected with the highest level of security. Vault Insight ensures that your information is safe and confidential.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3 }}>
                <ThumbUpIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography>
                  With an intuitive interface, Vault Insight makes managing your financial transactions easy, even for non-experts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3 }}>
                <StarsIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  Advanced Analytics
                </Typography>
                <Typography>
                  Gain deep insights into your financial data with advanced analytics and reporting tools. Make informed decisions with ease.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#e0f7fa', py: 10 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            What Our Users Are Saying
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    "Vault Insight has revolutionized the way we manage our finances."
                  </Typography>
                  <Typography color="textSecondary">
                    - Jane Doe, CEO of Acme Corp
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Avatar alt="Jane Doe" src="https://source.unsplash.com/random/100x100?person" />
                    <Rating value={5} readOnly />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    "The analytics tools are unparalleled. We've saved thousands!"
                  </Typography>
                  <Typography color="textSecondary">
                    - John Smith, CFO of Widget Inc
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Avatar alt="John Smith" src="https://source.unsplash.com/random/100x100?business" />
                    <Rating value={4.5} readOnly />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    "Vault Insight is a game-changer for small businesses."
                  </Typography>
                  <Typography color="textSecondary">
                    - Mary Johnson, Owner of Boutique Co.
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Avatar alt="Mary Johnson" src="https://source.unsplash.com/random/100x100?female" />
                    <Rating value={5} readOnly />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Certifications Section */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Certified and Trusted by Industry Leaders
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} alignItems="center">
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
                <VerifiedIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  ISO 27001 Certified
                </Typography>
                <Typography>
                  Vault Insight is ISO 27001 certified, ensuring the highest standards of data security and management.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
                <BusinessIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  Trusted by Fortune 500 Companies
                </Typography>
                <Typography>
                  Leading enterprises trust Vault Insight to manage their financial data with precision and care.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 3, textAlign: 'center' }}>
                <StarsIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h6" gutterBottom>
                  Rated #1 Financial Tool
                </Typography>
                <Typography>
                  Vault Insight is rated as the top financial management tool by industry experts.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#1976d2', py: 4, color: 'white' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography>
                Email: support@vaultinsight.com
              </Typography>
              <Typography>
                Phone: +1 800 123 4567
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ContactSupportIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={<MuiLink href="/help" sx={{ color: 'white', textDecoration: 'none' }}>Help Center</MuiLink>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ContactSupportIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={<MuiLink href="/privacy" sx={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</MuiLink>} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <MuiLink href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
                  <Avatar sx={{ bgcolor: '#3b5998' }}>F</Avatar>
                </MuiLink>
                <MuiLink href="https://twitter.com" target="_blank" sx={{ color: 'white' }}>
                  <Avatar sx={{ bgcolor: '#1DA1F2' }}>T</Avatar>
                </MuiLink>
                <MuiLink href="https://linkedin.com" target="_blank" sx={{ color: 'white' }}>
                  <Avatar sx={{ bgcolor: '#0077b5' }}>L</Avatar>
                </MuiLink>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <LoginDialog open={loginOpen} onClose={handleLoginClose} />
      <RegisterDialog open={registerOpen} onClose={handleRegisterClose} />
    </Box>
  );
};

export default HomePage;
