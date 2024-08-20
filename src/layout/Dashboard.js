import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Button,
  Drawer,
  Container,
  ListItem,
  ListItemButton,
  ListItemText
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

import DrawerDashboard from './Drawer';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    marginTop: 100,
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
  "/summary",
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
  "/gantt-chart",
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

  // Add event listeners for TAB, SHIFT + TAB, and Control + Enter
  useEffect(() => {
    const handleKeyDown = (event) => {

      console.log(event.key)
      if (event.ctrlKey || event.shiftKey) {
        if (event.key == 'ArrowLeft') {
          // SHIFT + TAB for Previous
          event.preventDefault(); // Prevent the default tabbing behavior
          handlePreviousAnalysis();
        } else if (event.key == 'ArrowRight'){
          // TAB for Next
          event.preventDefault(); // Prevent the default tabbing behavior
          handleNextAnalysis();
        }
      } else if (event.key === 'Enter' && event.ctrlKey) {
        // Control + Enter to navigate to /summary
        event.preventDefault();
        navigate('/summary');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname, navigate]); // Dependency array to ensure the correct route is used

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
          <Container 
            sx={{ display: 'flex', justifyContent:"end",  mr: 0 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={toggleShowAnalytics}
              sx={{ mr: 2 }}
            >
              {showAnalytics ? translate("Show Data", language) : translate("Show Analysis", language)}
            </Button>
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
            onClick={toggleLanguage}
          >
            {translate("Switch Language", language)}
            </Button>

          </Container>
        </Toolbar>
      </AppBar>
        {/* <ListItem key="logout" disablePadding onClick={handleLogout}>
            <ListItemButton>
                <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
            </ListItemButton>
        </ListItem>
      </Drawer> */}
      <DrawerDashboard setShowAnalytics={setShowAnalytics} setCurrentAnalysisPage={setCurrentAnalysisPage} />

      <Main open={open} sx={{}}>
        <Box>
          {React.cloneElement(children, { showAnalytics, currentAnalysisPage })}
        </Box>
      </Main>
    </Box>
  );
};

export default Dashboard;
