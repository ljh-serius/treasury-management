import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import TransactionBooks from './TransactionBooks'; // Import TransactionBooks
import { initialTransactions } from './transactionHelpers';

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();

  const [transactions, setTransactions] = useState({});
  const [transactionName, setTransactionName] = useState('Main transaction book');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Load transaction books from local storage on mount
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    if (!savedBooks['Main transaction book']) {
      savedBooks['Main transaction book'] = JSON.parse(JSON.stringify(initialTransactions));
      localStorage.setItem('books', JSON.stringify(savedBooks));
    }
    setAvailableTransactions(Object.keys(savedBooks));
    setTransactions(savedBooks);
  }, []);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleTransactionChange = (name) => {
    setTransactionName(name);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
    }, 300); // Delay close to avoid interference
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const generateRandomTransactions = () => {
    const randomTransactions = {
      encaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Encaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000),
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      })),
      decaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Décaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000),
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      })),
    };

    const updatedBooks = {
      ...transactions,
      [transactionName]: randomTransactions,
    };

    // Save to local storage
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    // Update state to trigger re-render
    setTransactions(updatedBooks);
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
      savedBooks[name] = JSON.parse(JSON.stringify(initialTransactions));
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(savedBooks);
    }
  };

  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction Books" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="generate" disablePadding>
          <ListItemButton onClick={generateRandomTransactions}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Generate Random Transactions" />
          </ListItemButton>
        </ListItem>
        <ListItem key="new" disablePadding>
          <ListItemButton onClick={handleNewTransaction}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Transaction Book" />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Check if children is of type TransactionBooks
  const isTransactionBooks = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TransactionBooks
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {currentLocation.pathname === '/' && (
            <TransactionSelect
              transactionName={transactionName}
              availableTransactions={availableTransactions}
              handleTransactionChange={handleTransactionChange}
            />
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="transaction books"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Conditionally render based on child type */}
        {isTransactionBooks && (
          <TransactionBooks transactionName={transactionName} transactions={transactions[transactionName]} />
        ) || children}
      </Box>
    </Box>
  );
};

export default Dashboard;