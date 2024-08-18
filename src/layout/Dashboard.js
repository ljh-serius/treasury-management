import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Button,
  Drawer,
  Container,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { translate } from '../utils/translate';
import { useTranslation } from '../contexts/TranslationProvider';
import { useNavigate, useLocation } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DrawerDashboard from './Drawer';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const routesSequence = [
  "/management/clients",
  "/management/partners",
  "/management/providers",
  "/management/employees",
  "/management/costs",
  "/management/risks",
  "/management/campaigns",
  "/management/projects",
  "/management/invoices",
  "/management/products",
  "/management/entities",
];

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const { language, toggleLanguage } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = useState(true);
  const [currentAnalysisPage, setCurrentAnalysisPage] = useState(0);

  const [showAnalytics, setShowAnalytics] = useState(() => {
    const saved = localStorage.getItem('showAnalytics');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('showAnalytics', JSON.stringify(showAnalytics));
  }, [showAnalytics]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleShowAnalytics = () => {
    setShowAnalytics((prev) => !prev);
    setCurrentAnalysisPage(0); // Reset to the first page whenever toggling between data and analysis
  };

  const handleNextAnalysis = () => {
    const currentIndex = routesSequence.indexOf(location.pathname);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % routesSequence.length; // Circular navigation
      navigate(routesSequence[nextIndex]);
    }
  };

  const handlePreviousAnalysis = () => {
    const currentIndex = routesSequence.indexOf(location.pathname);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + routesSequence.length) % routesSequence.length; // Circular navigation
      navigate(routesSequence[prevIndex]);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Container 
            sx={{ display: 'flex', justifyContent:"end",  mr: 0 }}
          >
             {showAnalytics && 
              <>
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  color="inherit"
                  onClick={handlePreviousAnalysis}
                >
                  Previous
                </Button>
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  color="inherit"
                  onClick={handleNextAnalysis}
                >
                  Next
                </Button>
              </>
            }
            <Button
              variant="outlined"
              color="inherit"
              onClick={toggleShowAnalytics}
              sx={{ mr: 2 }}
            >
              {showAnalytics ? translate("Show Data", language) : translate("Show Analysis", language)}
            </Button>
             <Button
            variant="outlined"
            color="inherit"
            onClick={toggleLanguage}
          >
            {translate("Switch Language", language)}
            </Button>

          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <DrawerDashboard setShowAnalytics={setShowAnalytics} setCurrentAnalysisPage={setCurrentAnalysisPage} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
          {React.cloneElement(children, { showAnalytics, currentAnalysisPage })}
        </Box>
      </Main>
    </Box>
  );
};

export default Dashboard;
