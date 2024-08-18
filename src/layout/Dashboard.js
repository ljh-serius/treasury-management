import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';

import SummarizeIcon from '@mui/icons-material/Summarize';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 240;

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

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const { language, toggleLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

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
    setShowAnalytics(!showAnalytics);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Divider />
        <ListItem key="treasury" disablePadding>
          <ListItemButton component={Link} to="/summary">
            <ListItemIcon>
              <SummarizeIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Treasury</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="people-and-relationships" disablePadding>
          <ListItemButton>
            <ListItemText primary={<Typography variant="body1">People and Relationships</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="clients" disablePadding>
          <ListItemButton component={Link} to="/management/clients">
            <ListItemIcon>
              <SummarizeIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Clients</Typography>} />
          </ListItemButton>
        </ListItem>

        <ListItem key="partners" disablePadding>
          <ListItemButton component={Link} to="/management/partners">
            <ListItemIcon>
              <GroupIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Partners</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="providers" disablePadding>
          <ListItemButton component={Link} to="/management/providers">
            <ListItemIcon>
              <StorefrontIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Providers</Typography>} />
          </ListItemButton>
        </ListItem>

        <Divider />
        <ListItem key="operations" disablePadding>
          <ListItemButton>
            <ListItemText primary={<Typography variant="body1">Operations</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="costs" disablePadding>
          <ListItemButton component={Link} to="/management/costs">
            <ListItemIcon>
              <MonetizationOnIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Costs</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="risks" disablePadding>
          <ListItemButton component={Link} to="/management/risks">
            <ListItemIcon>
              <SecurityIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Risks</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="campaigns" disablePadding>
          <ListItemButton component={Link} to="/management/campaigns">
            <ListItemIcon>
              <PeopleAltIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Campaigns</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="projects" disablePadding>
          <ListItemButton component={Link} to="/management/projects">
            <ListItemIcon>
              <WorkIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Projects</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="invoices" disablePadding>
          <ListItemButton component={Link} to="/management/invoices">
            <ListItemIcon>
              <ReceiptIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Invoices</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="products" disablePadding>
          <ListItemButton component={Link} to="/management/products">
            <ListItemIcon>
              <InventoryIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Products</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="documents" disablePadding>
          <ListItemButton>
            <ListItemText primary={<Typography variant="body1">Documents</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="gantt-chart" disablePadding>
          <ListItemButton component={Link} to="/gantt-chart">
            <ListItemIcon>
              <TimelineIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Gantt Chart</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <InsightsIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Analytics</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="parameters" disablePadding>
          <ListItemButton component={Link} to="/parameters">
            <ListItemIcon>
              <SettingsIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Parameters</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="entities" disablePadding>
          <ListItemButton component={Link} to="/management/entities">
            <ListItemIcon>
              <TimelineIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Entities</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
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
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleShowAnalytics}
            sx={{ ml: 'auto', fontSize: '0.8rem' }}
          >
            {showAnalytics ? translate("Show Data", language) : translate("Show Analysis", language)}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleLanguage}
            sx={{ ml: 2, fontSize: '0.8rem' }}
          >
            {translate("Switch Language", language)}
          </Button>
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
        {drawer}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
          {React.cloneElement(children, { showAnalytics })}
        </Box>
      </Main>
    </Box>
  );
};

export default Dashboard;
