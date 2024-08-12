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
import { initialTransactions } from './transactionHelpers'; // adjust the path as needed
import LogoutIcon from '@mui/icons-material/Logout';
import LoginDialog from './LoginDialog'; // Adjust the path as necessary
import RegisterDialog from './RegisterDialog'; // Adjust the path as necessary

// Firebase operations
import { saveTransactionBook, getTransactionBooks } from '../utils/firebaseHelpers';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();
  const drawerWidth = 240; // or whatever width you need

  const [transactions, setTransactions] = useState({});
  const [transactionName, setTransactionName] = useState('Main transaction book');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  
  console.log("transaction dashboard ", transactions)
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (userId) {
        const books = await getTransactionBooks(userId);
  
        if (Object.keys(books).length === 0) {
          // No books found, create a default one
          const defaultBookName = 'Main Book';
          const defaultTransactions = initialTransactions; // Assuming `initialTransactions` is your default structure
          await saveTransactionBook(userId, defaultBookName, defaultTransactions);
          setTransactions({ [defaultBookName]: defaultTransactions });
          setAvailableTransactions([defaultBookName]);
          setTransactionName(defaultBookName); // Automatically select the newly created book
        } else {
          setTransactions(books);
          setAvailableTransactions(Object.keys(books));
          setTransactionName(Object.keys(books)[0]); // Optionally, select the first available book
        }
      }
    };
    fetchTransactions();
  }, [userId]);
  
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleTransactionChange = (name) => {
    setTransactionName(name);
  };

  const handleNewTransaction = async () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const updatedTransactions = { ...transactions, [name]: initialTransactions };
      setTransactions(updatedTransactions);
      setAvailableTransactions([...availableTransactions, name]);

      // Save to Firebase
      await saveTransactionBook(userId, name, initialTransactions);
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
    // Generate random transactions
    const encaissements = Array.from({ length: 5 }, (_, i) => ({
      nature: `Encaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));
  
    const decaissements = Array.from({ length: 5 }, (_, i) => ({
      nature: `Décaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));
  
    // Calculate totals for encaissements and decaissements
    const totalEncaissement = encaissements.reduce((total, transaction) => {
      return {
        nature: 'Total Encaissements',
        montantInitial: total.montantInitial + transaction.montantInitial,
        montants: total.montants.map((monthTotal, index) => monthTotal + transaction.montants[index]),
      };
    }, {
      nature: 'Total Encaissements',
      montantInitial: 0,
      montants: Array(12).fill(0),
    });
  
    const totalDecaissement = decaissements.reduce((total, transaction) => {
      return {
        nature: 'Total Décaissements',
        montantInitial: total.montantInitial + transaction.montantInitial,
        montants: total.montants.map((monthTotal, index) => monthTotal + transaction.montants[index]),
      };
    }, {
      nature: 'Total Décaissements',
      montantInitial: 0,
      montants: Array(12).fill(0),
    });
  
    // Add totals to the arrays
    encaissements.push(totalEncaissement);
    decaissements.push(totalDecaissement);
  
    const randomTransactions = {
      encaissements,
      decaissements,
    };
  
    const updatedBooks = {
      ...transactions,
      [transactionName]: randomTransactions,
    };
  
    // Update state to trigger re-render
    setTransactions(updatedBooks);
  
    // Save to Firebase (or your preferred storage)
    await saveTransactionBook(userId, transactionName, randomTransactions);
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

  const handleModalSubmit = () => {
    const updatedTransactions = { ...transactions[transactionName] };
  
    const initializeMonths = (transaction) => {
      if (!transaction.montants) {
        transaction.montants = Array(12).fill(0);
      }
    };
  
    const processTransaction = (type, name, amount, months) => {
      if (!updatedTransactions[type]) {
        updatedTransactions[type] = [];
      }
  
      let existingTransaction = updatedTransactions[type].find(t => t.nature === name);
  
      if (existingTransaction) {
        initializeMonths(existingTransaction);
        months.forEach(monthIndex => {
          existingTransaction.montants[monthIndex] += amount;
        });
      } else {
        const newTransaction = {
          nature: name,
          montantInitial: 0,
          montants: Array(12).fill(0),
        };
  
        months.forEach(monthIndex => {
          newTransaction.montants[monthIndex] = amount;
        });
  
        // Insert the new transaction at the beginning of the array (n - 1 order)
        updatedTransactions[type] = [newTransaction, ...(updatedTransactions[type] || [])];
      }
    };
  
    processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);
  
    const updatedBooks = {
      ...transactions,
      [transactionName]: updatedTransactions, // Store only within the relevant book
    };
  
    setTransactions(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  
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
          <ListItemButton onClick={handleNewTransaction}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Transaction Book" />
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
                transactionName={transactionName}
                availableTransactions={availableTransactions}
                handleTransactionChange={handleTransactionChange}
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
          <TransactionBooks transactionName={transactionName} transactions={transactions[transactionName]} />
        ) : (
          children
        )}
        <AddTransactionModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          newTransactionType={newTransactionType}
          newTransactionName={newTransactionName}
          setNewTransactionName={setNewTransactionName}
          availableTransactions={availableTransactions}
          newTransactionAmount={newTransactionAmount}
          setNewTransactionAmount={setNewTransactionAmount}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          handleModalSubmit={handleModalSubmit}
          availableMonths={monthNames.slice(1)}
          monthNames={Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)}
          transactions={transactions[transactionName]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
