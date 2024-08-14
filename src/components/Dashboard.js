import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import TransactionBooks from './TransactionBooks';
import AddTransactionModal from './AddTransactionModal';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { v4 as uuidv4 } from 'uuid';
import BookIcon from '@mui/icons-material/Book';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

// Import the summary helpers
import { getAllTransactionSummaries, saveSummaryToFirestore } from '../utils/firebaseHelpers';

// Import the translation utilities and context
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Utility to get the current time
const getCurrentTime = () => new Date().getTime();

// Utility to check if data should be refetched
const shouldRefetchData = (lastFetchTime, intervalInMs = 3600000) => {
  const currentTime = getCurrentTime();
  return !lastFetchTime || (currentTime - lastFetchTime) > intervalInMs;
};

// Utility to store data in localStorage
const saveToLocalStorage = (key, data) => {
  const dataToStore = {
    timestamp: getCurrentTime(),
    data
  };
  localStorage.setItem(key, JSON.stringify(dataToStore));
};

// Utility to load data from localStorage
const loadFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();
  const drawerWidth = 240;

  const { language, toggleLanguage } = useTranslation();
  
  const [summaries, setSummaries] = useState({});
  const [summaryName, setSummaryName] = useState(translate('Main transaction book', language));
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
      // const localStorageKey = 'transactionSummaries';
      // const storedData = loadFromLocalStorage(localStorageKey);

      // if (storedData && !shouldRefetchData(storedData.timestamp)) {
      //   setSummaries(storedData.data);
      //   const firstSummary = Object.keys(storedData.data)[0];
      //   setSummaryName(storedData.data[firstSummary]?.name || translate('Main transaction book', language));
      //   const summaryNames = Object.keys(storedData.data).map((key) => storedData.data[key].name);
      //   setAvailableSummaries(summaryNames);
      //   return;
      // }

      const organizationId = localStorage.getItem('organizationId');

      console.log("fetching all")
      if (organizationId) {
        try {
          const summaryData = await getAllTransactionSummaries(organizationId);
        
          
          console.log(summaryData)
          setSummaries(summaryData);
          const firstSummary = Object.keys(summaryData)[0];
          setSummaryName(summaryData[firstSummary]?.name || translate('Main transaction book', language));
          const summaryNames = Object.keys(summaryData).map((key) => summaryData[key].name);
          setAvailableSummaries(summaryNames);

          // Store fetched data in localStorage
          // saveToLocalStorage(localStorageKey, summaryData);
        } catch (error) {
          console.error("Error fetching summaries: ", error);
        }
      }
    };

    fetchSummaries();
  }, [userId, language]);

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
    const name = prompt(translate('Enter name for new summary set:', language));
    if (name) {
      const year = new Date().getFullYear();
      const newSummary = { name, encaissements: [], decaissements: [] };
      const updatedSummaries = { ...summaries, [year]: newSummary };
      setSummaries(updatedSummaries);
      setAvailableSummaries([...availableSummaries, name]);

      setSummaryName(name)
      const organizationId = localStorage.getItem("organizationId");
      // Save to Firestore
      await saveSummaryToFirestore(organizationId, year, newSummary);
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
    try {
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
  
      // Ensure these variables are defined
      if (!summaryName) {
        throw new Error('summaryName is undefined');
      }
      if (!userId) {
        throw new Error('userId is undefined');
      }
  
      const randomSummary = {
        name: summaryName,
        encaissements,
        decaissements,
      };
  
      const updatedSummaries = {
        ...summaries,
        [summaryName]: randomSummary,
      };
  
      setSummaries(updatedSummaries);
  
      // Logging the variables before passing them to the function
      console.log('Saving summary:', {
        userId,
        summaryName,
        randomSummary,
      });
      const organizationId = localStorage.getItem("organizationId");
      // Save to Firestore
      await saveSummaryToFirestore(organizationId, summaryName, randomSummary);
    } catch (error) {
      console.error('Error in generateRandomTransactions:', error);
    }
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
    const organizationId = localStorage.getItem("organizationId");

    await saveSummaryToFirestore(organizationId, currentSummaryId, updatedSummary);

    handleModalClose();
  };

  console.log(translate("Transaction Books", language))


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/books">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={String(translate("Transaction Books", language))} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="generate" disablePadding>
          <ListItemButton onClick={generateRandomTransactions}>
            <ListItemIcon>
              <ShuffleIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Generate Random Summary", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="new" disablePadding>
          <ListItemButton onClick={handleNewSummary}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Add New Summary", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <InsertChartIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Analytics", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="units" disablePadding>
          <ListItemButton component={Link} to="/units">
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Units", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="summary" disablePadding>
          <ListItemButton component={Link} to="/summary">
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Summary", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="manage-users" disablePadding>
          <ListItemButton component={Link} to="/manage-users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Manage Users", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem key="manage-organization" disablePadding>
          <ListItemButton component={Link} to="/manage-organization">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Manage Organization", language)} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={translate("Logout", language)} />
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
                  {translate("Encaissements", language)}
                </MenuItem>
                <MenuItem onClick={() => handleAddTransaction('decaissements')}>
                  {translate("Décaissements", language)}
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
                {translate("Login", language)}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterOpen}
              >
                {translate("Register", language)}
              </Button>
            </Box>
          )}
          <LoginDialog open={loginOpen} onClose={handleLoginClose} />
          <RegisterDialog open={registerOpen} onClose={handleRegisterClose} />
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleLanguage}
            sx={{ ml: 'auto' }}
          >
            {translate("Switch Language", language)}
          </Button>
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
