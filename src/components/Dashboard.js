import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import TransactionBooks from './TransactionBooks';
import AddTransactionModal from './AddTransactionModal';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { v4 as uuidv4 } from 'uuid';

// Import the summary helpers
import { getAllTransactionSummaries, saveSummaryToFirestore } from '../utils/firebaseHelpers'; 

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();
  const drawerWidth = 240;

  const [summaries, setSummaries] = useState({});
  const [summaryName, setSummaryName] = useState('Main transaction book');
  const [availableSummaries, setAvailableSummaries] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSummaryId, setCurrentSummaryId] = useState('');

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const currentId = Object.keys(summaries).filter((uuidKey) => {
      return summaries[uuidKey].name === summaryName;
    })[0];

    setCurrentSummaryId(currentId);
  }, [summaryName, summaries]);

  useEffect(() => {
    const fetchSummaries = async () => {
      if (userId) {
        try {
          const summaryData = await getAllTransactionSummaries(userId);
          
          setSummaries(summaryData);
          const firstSummary = Object.keys(summaryData)[0];
          setSummaryName(summaryData[firstSummary]?.name || 'Main transaction book');
          const summaryNames = Object.keys(summaryData).map((key) => summaryData[key].name);
          setAvailableSummaries(summaryNames);
        } catch (error) {
          console.error("Error fetching summaries: ", error);
        }
      }
    };

    fetchSummaries();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleSummaryChange = (name) => {
    setSummaryName(name);
  };

  const handleNewSummary = async () => {
    const name = prompt('Enter name for new summary set:');
    if (name) {
      const year = new Date().getFullYear();
      const newSummary = { name, encaissements: [], decaissements: [] };
      const updatedSummaries = { ...summaries, [year]: newSummary };
      setSummaries(updatedSummaries);
      setAvailableSummaries([...availableSummaries, name]);

      // Save to Firestore
      await saveSummaryToFirestore(userId, year, newSummary);
    }
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
    }, 300);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const generateRandomTransactions = async () => {
    const encaissements = Array.from({ length: 5 }, (_, i) => ({
      id: uuidv4(),
      nature: `Encaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));

    const decaissements = Array.from({ length: 5 }, (_, i) => ({
      id: uuidv4(),
      nature: `Décaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));

    const randomSummary = {
      name: summaryName,
      encaissements,
      decaissements,
    };

    const updatedSummaries = {
      ...summaries,
      [currentSummaryId]: randomSummary,
    };

    setSummaries(updatedSummaries);

    await saveSummaryToFirestore(userId, currentSummaryId, randomSummary);
  };

  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    setNewTransactionType(type);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewTransactionName('');
    setNewTransactionAmount('');
    setSelectedMonths([]);
  };

  const handleModalSubmit = async () => {
    const updatedSummary = { ...summaries[currentSummaryId] };

    const initializeMonths = (transaction) => {
      if (!transaction.montants) {
        transaction.montants = Array(12).fill(0);
      }
    };

    const processTransaction = (type, name, amount, months) => {
      if (!updatedSummary[type]) {
        updatedSummary[type] = [];
      }

      let existingTransaction = updatedSummary[type].find(t => t.nature === name);

      if (existingTransaction) {
        initializeMonths(existingTransaction);
        months.forEach(monthIndex => {
          existingTransaction.montants[monthIndex] += parseFloat(amount);
        });
      } else {
        const newTransaction = {
          id: uuidv4(),
          nature: name,
          montantInitial: 0,
          montants: Array(12).fill(0),
        };

        months.forEach(monthIndex => {
          newTransaction.montants[monthIndex] = parseFloat(amount);
        });

        updatedSummary[type] = [newTransaction, ...(updatedSummary[type] || [])];
      }
    };

    if (newTransactionAmount && newTransactionName) {
      processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);
    } else {
      console.warn('Transaction Name or Amount is invalid.');
      return;
    }

    const updatedSummaries = {
      ...summaries,
      [currentSummaryId]: updatedSummary,
    };

    setSummaries(updatedSummaries);

    await saveSummaryToFirestore(userId, currentSummaryId, updatedSummary);

    handleModalClose();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/books">
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
          <ListItemButton onClick={handleNewSummary}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Summary" />
          </ListItemButton>
        </ListItem>
        <ListItem key="comparatives" disablePadding>
          <ListItemButton component={Link} to="/comparatives">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Comparatives" />
          </ListItemButton>
        </ListItem>
        <ListItem key="details" disablePadding>
          <ListItemButton component={Link} to="/details">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction Details" />
          </ListItemButton>
        </ListItem>
        <ListItem key="generate-units" disablePadding>
          <ListItemButton component={Link} to="/generate-units">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Generate Units" />
          </ListItemButton>
        </ListItem>
        <ListItem key="summary" disablePadding>
          <ListItemButton component={Link} to="/summary">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const isTransactionBooks = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TransactionBooks
  );

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

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
          <Typography
            variant="h6"
            component={Link}
            to="/blog"
            sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
          >
            Blog
          </Typography>
          {currentLocation.pathname === '/books' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TransactionSelect
                transactionName={summaryName}
                availableTransactions={availableSummaries}
                handleTransactionChange={handleSummaryChange}
              />
              <IconButton
                color="default"
                variant="round"
                onClick={handleAddClick}
                style={{ backgroundColor: 'purple', marginLeft: '10px' }}
              >
                <AddIcon style={{ fontSize: '1.5rem' }} />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleAddTransaction('encaissements')}>
                  Encaissements
                </MenuItem>
                <MenuItem onClick={() => handleAddTransaction('decaissements')}>
                  Décaissements
                </MenuItem>
              </Menu>
            </div>
          )}
          {currentLocation.pathname === '/' && (
            <Box>
              <Button
                variant="contained"
                color="info"
                onClick={handleLoginOpen}
                sx={{
                  marginRight: '5px'
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterOpen}
              >
                Register
              </Button>
            </Box>
          )}
          <LoginDialog open={loginOpen} onClose={handleLoginClose} />
          <RegisterDialog open={registerOpen} onClose={handleRegisterClose} />
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
        {isTransactionBooks ? (
          <TransactionBooks transactionName={summaryName} transactions={summaries[currentSummaryId]} />
        ) : (
          children
        )}
        <AddTransactionModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          newTransactionType={newTransactionType}
          newTransactionName={newTransactionName}
          setNewTransactionName={setNewTransactionName}
          availableTransactions={availableSummaries}
          newTransactionAmount={newTransactionAmount}
          setNewTransactionAmount={setNewTransactionAmount}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          handleModalSubmit={handleModalSubmit}
          availableMonths={monthNames}
          monthNames={Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)}
          transactions={summaries[currentSummaryId]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
